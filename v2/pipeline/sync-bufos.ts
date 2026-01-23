import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

// Configuration
const ALL_THE_BUFO_DIR = "/tmp/all-the-bufo/all-the-bufo";
const BUFO_DATA_PATH = "../site/public/bufo-data.json";
const SKIP_LIST_PATH = "./skip-list.json";
const BUFOS_DIR = "../site/public/bufos";
const SMOL_BUFOS_DIR = "../site/public/smolBufos";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const TEST_MODE = process.env.TEST_MODE === "true";
const TEST_MODE_LIMIT = 10;

// Types
interface BufoEntry {
  id: string;
  fileType: string;
  tags: string[];
}

interface BufoData {
  tags: string[];
  bufos: BufoEntry[];
}

interface SkipEntry {
  id: string;
  fileType: string;
  reason: string;
}

interface SkipList {
  skipped: SkipEntry[];
}

// Known tags for consistency
const KNOWN_TAGS = [
  "accessories", "acknowledgement", "agree", "amogus", "anger", "angry", "animal",
  "animated", "anthropomorphic", "anxiety", "approve", "arrival", "avoids-you",
  "awkward", "baby", "back", "bad", "birthday", "blank-stare", "boba", "bonk",
  "but-instead", "but-you-can-see", "cannibalism", "celebration", "chonker",
  "christmas", "clown", "confused", "cool", "core", "country", "covid", "cozy",
  "cry", "cursed", "cute", "dance", "disagree", "disbelief", "discomfort",
  "dislike", "drink", "drowning", "emergency", "encouragement", "evil", "excited",
  "fancy", "farewell", "feel-better", "fight", "fire", "food", "found-something",
  "fruit", "gandalf", "gratitude", "greetings", "hacker", "happy", "has-a",
  "high-quality", "holiday", "horror", "hotdog", "ice", "inspirational",
  "je-ne-sais-quoi", "jealous", "judging", "kills-you", "laugh", "like", "love",
  "low-fi", "magic", "mario", "meme", "meta", "money", "music", "offers", "pain",
  "panic", "plead", "pokemon", "pray", "profession", "punishment", "rage",
  "reference", "relief", "religion", "request", "sad", "sarcasam", "shock",
  "skepticism", "smart", "software-reference", "space", "sports", "stab",
  "star-wars", "stonks", "sus", "sword", "take-a-look", "takes-your",
  "thinks-about", "tired", "trapped", "ui", "unsure", "upset", "vegetable", "void", "worry"
];

function loadBufoData(): BufoData {
  const dataPath = path.resolve(__dirname, BUFO_DATA_PATH);
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(data);
  }
  return { tags: KNOWN_TAGS, bufos: [] };
}

function saveBufoData(data: BufoData): void {
  const dataPath = path.resolve(__dirname, BUFO_DATA_PATH);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

function loadSkipList(): SkipList {
  const skipPath = path.resolve(__dirname, SKIP_LIST_PATH);
  if (fs.existsSync(skipPath)) {
    const data = fs.readFileSync(skipPath, "utf-8");
    return JSON.parse(data);
  }
  return { skipped: [] };
}

function saveSkipList(data: SkipList): void {
  const skipPath = path.resolve(__dirname, SKIP_LIST_PATH);
  fs.writeFileSync(skipPath, JSON.stringify(data, null, 2));
}

function getExistingBufoIds(data: BufoData, skipList: SkipList): Set<string> {
  const ids = new Set<string>();
  data.bufos.forEach(b => ids.add(`${b.id}.${b.fileType}`));
  skipList.skipped.forEach(s => ids.add(`${s.id}.${s.fileType}`));
  return ids;
}

function getSourceBufoFiles(): string[] {
  if (!fs.existsSync(ALL_THE_BUFO_DIR)) {
    console.error(`Source directory not found: ${ALL_THE_BUFO_DIR}`);
    return [];
  }
  return fs.readdirSync(ALL_THE_BUFO_DIR).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return [".png", ".gif", ".jpg", ".jpeg", ".webp"].includes(ext);
  });
}

interface GeminiResult {
  tags: string[];
  skip: boolean;
  skipReason: string;
}

interface BatchRequest {
  filename: string;
  imagePath: string;
  id: string;
  fileType: string;
}

async function analyzeBufoWithGemini(filename: string, imagePath: string): Promise<GeminiResult> {
  if (!GEMINI_API_KEY) {
    console.log(`  No Gemini API key, using default tags for: ${filename}`);
    return { tags: [], skip: false, skipReason: "" };
  }

  try {
    // Read the image and convert to base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");
    const mimeType = imagePath.endsWith(".gif") ? "image/gif" : 
                     imagePath.endsWith(".png") ? "image/png" :
                     imagePath.endsWith(".webp") ? "image/webp" : "image/jpeg";

    const prompt = `You are analyzing a "bufo" emoji/sticker image. Bufo is a cute cartoon frog character used in messaging apps.

Based on this image and its filename "${filename}", you need to:

1. Determine if this bufo should be SKIPPED. The ONLY valid reason to skip is:
   - It is a TILING BUFO: part of a larger image that has been split into tiles/grid pieces (like bigbufo_0_0, bigbufo_1_2, etc.)

2. If NOT skipped, provide appropriate tags from this allowed list: ${KNOWN_TAGS.join(", ")}

Respond ONLY with valid JSON in this exact format:
{"skip": false, "skipReason": "", "tags": ["tag1", "tag2"]}

If skipping, set skip to true and provide the skipReason (must be "tiling bufo" or similar), and tags can be empty.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: mimeType, data: base64Image } }
            ]
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 256,
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`  Gemini API error for ${filename}: ${response.status} - ${errorText}`);
      return { tags: [], skip: false, skipReason: "" };
    }

    const result = await response.json() as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    };
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        const validTags = (parsed.tags || []).filter((t: string) => KNOWN_TAGS.includes(t));
        return { 
          tags: validTags, 
          skip: Boolean(parsed.skip),
          skipReason: parsed.skipReason || ""
        };
      } catch (parseError) {
        console.log(`  Error parsing Gemini JSON response for ${filename}:`, parseError);
        return { tags: [], skip: false, skipReason: "" };
      }
    }
  } catch (error) {
    console.log(`  Error analyzing ${filename}:`, error);
  }

  return { tags: [], skip: false, skipReason: "" };
}

async function analyzeBufosInBatch(batchRequests: BatchRequest[]): Promise<Map<string, GeminiResult>> {
  const results = new Map<string, GeminiResult>();
  
  if (!GEMINI_API_KEY) {
    console.log("No Gemini API key, using default tags for all bufos");
    batchRequests.forEach(req => {
      results.set(req.filename, { tags: [], skip: false, skipReason: "" });
    });
    return results;
  }

  console.log(`Processing ${batchRequests.length} bufos in batch mode...\n`);
  
  // Process in concurrent batches of 10 to respect rate limits
  const BATCH_SIZE = 10;
  const DELAY_BETWEEN_BATCHES = 1000; // 1 second between batches
  
  for (let i = 0; i < batchRequests.length; i += BATCH_SIZE) {
    const batch = batchRequests.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(batchRequests.length / BATCH_SIZE)} (${batch.length} bufos)...`);
    
    // Process this batch concurrently
    const promises = batch.map(async (req) => {
      const result = await analyzeBufoWithGemini(req.filename, req.imagePath);
      return { filename: req.filename, result };
    });
    
    const batchResults = await Promise.all(promises);
    
    // Store results
    batchResults.forEach(({ filename, result }) => {
      results.set(filename, result);
    });
    
    // Delay between batches to respect rate limits
    if (i + BATCH_SIZE < batchRequests.length) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
    }
  }
  
  console.log(`\nBatch processing complete!\n`);
  return results;
}

async function generateSmolBufo(id: string, fileType: string): Promise<void> {
  const filename = `${id}.${fileType}`;
  const bufosDir = path.resolve(__dirname, BUFOS_DIR);
  const smolBufosDir = path.resolve(__dirname, SMOL_BUFOS_DIR);
  
  const sourcePath = path.join(bufosDir, filename);
  const smolPath = path.join(smolBufosDir, filename);

  try {
    if (fileType === "gif") {
      // Copy GIFs as-is to preserve animation
      fs.copyFileSync(sourcePath, smolPath);
    } else {
      await sharp(sourcePath)
        .resize(64, 64)
        .toFile(smolPath);
    }
  } catch (error) {
    console.log(`  Error generating smol bufo for ${filename}:`, error);
    // Copy original as fallback
    fs.copyFileSync(sourcePath, smolPath);
  }
}

async function copyBufoToSite(id: string, fileType: string): Promise<void> {
  const filename = `${id}.${fileType}`;
  const sourcePath = path.join(ALL_THE_BUFO_DIR, filename);
  const destPath = path.join(path.resolve(__dirname, BUFOS_DIR), filename);
  
  fs.copyFileSync(sourcePath, destPath);
}

async function main() {
  console.log("Starting bufo sync pipeline...\n");
  
  if (TEST_MODE) {
    console.log(`*** TEST MODE ENABLED - Processing at most ${TEST_MODE_LIMIT} new bufos ***\n`);
  }

  // Load existing data
  const bufoData = loadBufoData();
  const skipList = loadSkipList();
  const existingIds = getExistingBufoIds(bufoData, skipList);
  console.log(`Found ${bufoData.bufos.length} existing bufos in data file`);
  console.log(`Found ${skipList.skipped.length} entries in skip list`);

  // Get source files
  const sourceFiles = getSourceBufoFiles();
  console.log(`Found ${sourceFiles.length} bufos in all-the-bufo repository\n`);

  // Find new bufos
  let newBufos = sourceFiles.filter(file => !existingIds.has(file));
  console.log(`Found ${newBufos.length} new bufos to process\n`);

  if (newBufos.length === 0) {
    console.log("No new bufos to add. Done!");
    return;
  }

  // In test mode, limit the number of bufos to process
  if (TEST_MODE && newBufos.length > TEST_MODE_LIMIT) {
    console.log(`Test mode: limiting to ${TEST_MODE_LIMIT} bufos\n`);
    newBufos = newBufos.slice(0, TEST_MODE_LIMIT);
  }

  // Ensure directories exist
  const bufosDir = path.resolve(__dirname, BUFOS_DIR);
  const smolBufosDir = path.resolve(__dirname, SMOL_BUFOS_DIR);
  if (!fs.existsSync(bufosDir)) fs.mkdirSync(bufosDir, { recursive: true });
  if (!fs.existsSync(smolBufosDir)) fs.mkdirSync(smolBufosDir, { recursive: true });

  // Prepare batch requests
  const batchRequests: BatchRequest[] = newBufos.map(filename => {
    const sourcePath = path.join(ALL_THE_BUFO_DIR, filename);
    const lastDotIndex = filename.lastIndexOf(".");
    const id = filename.substring(0, lastDotIndex);
    const fileType = filename.substring(lastDotIndex + 1);
    
    return {
      filename,
      imagePath: sourcePath,
      id,
      fileType
    };
  });

  // Process all bufos in batch
  const analysisResults = await analyzeBufosInBatch(batchRequests);

  // Process results and copy files
  let addedCount = 0;
  let skippedCount = 0;
  
  for (const req of batchRequests) {
    const result = analysisResults.get(req.filename);
    if (!result) {
      console.log(`  Warning: No result for ${req.filename}, skipping`);
      continue;
    }

    console.log(`Processing: ${req.filename}`);

    if (result.skip) {
      // Add to skip list (don't store files)
      skipList.skipped.push({
        id: req.id,
        fileType: req.fileType,
        reason: result.skipReason
      });
      console.log(`  Skipped: ${req.filename} (reason: ${result.skipReason})`);
      skippedCount++;
    } else {
      // Add to bufo data and copy files
      bufoData.bufos.push({
        id: req.id,
        fileType: req.fileType,
        tags: result.tags
      });

      await copyBufoToSite(req.id, req.fileType);
      await generateSmolBufo(req.id, req.fileType);
      console.log(`  Added: ${req.filename} with tags: [${result.tags.join(", ")}]`);
      addedCount++;
    }
  }

  // Save updated data
  saveBufoData(bufoData);
  saveSkipList(skipList);
  
  console.log(`\nDone! Added ${addedCount} new bufos, skipped ${skippedCount}, processed ${batchRequests.length} total.`);
}

main().catch(console.error);
