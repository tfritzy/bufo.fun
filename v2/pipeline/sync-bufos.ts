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
const TEST_MODE_LIMIT = 20;

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
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error saving bufo data to ${dataPath}:`, error);
    if (error instanceof Error) {
      console.error(`Error message: ${error.message}`);
    }
    throw error;
  }
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
  try {
    fs.writeFileSync(skipPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error saving skip list to ${skipPath}:`, error);
    if (error instanceof Error) {
      console.error(`Error message: ${error.message}`);
    }
    throw error;
  }
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

async function analyzeBufoWithGemini(filename: string, imagePath: string): Promise<GeminiResult> {
  if (!GEMINI_API_KEY) {
    console.log(`  No Gemini API key, using default tags for: ${filename}`);
    return { tags: [], skip: false, skipReason: "" };
  }

  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const mimeType = imagePath.toLowerCase().endsWith(".gif") ? "image/gif" : 
                     imagePath.toLowerCase().endsWith(".png") ? "image/png" :
                     imagePath.toLowerCase().endsWith(".webp") ? "image/webp" : "image/jpeg";

    const uploadResponse = await fetch(
      `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "X-Goog-Upload-Protocol": "resumable",
          "X-Goog-Upload-Command": "start, upload, finalize",
          "X-Goog-Upload-Header-Content-Type": mimeType,
          "Content-Type": "application/octet-stream"
        },
        body: imageBuffer
      }
    );

    if (!uploadResponse.ok) {
      const errorBody = await uploadResponse.text();
      console.error(`  File upload error for ${filename}:`);
      console.error(`  Status: ${uploadResponse.status} ${uploadResponse.statusText}`);
      console.error(`  Response body: ${errorBody}`);
      return { tags: [], skip: false, skipReason: "" };
    }

    const uploadResult = await uploadResponse.json() as { file?: { uri?: string; name?: string } };
    const fileUri = uploadResult.file?.uri;
    const fileName = uploadResult.file?.name;

    if (!fileUri) {
      console.error(`  No file URI returned for ${filename}`);
      return { tags: [], skip: false, skipReason: "" };
    }

    try {
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
                { file_data: { mime_type: mimeType, file_uri: fileUri } }
              ]
            }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`  Gemini API error for ${filename}:`);
        console.error(`  Status: ${response.status} ${response.statusText}`);
        console.error(`  Response body: ${errorBody}`);
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
      
      if (!text) {
        console.error(`  Gemini returned empty response for ${filename}`);
        return { tags: [], skip: false, skipReason: "" };
      }
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          const validTags = (parsed.tags || []).filter((t: string) => KNOWN_TAGS.includes(t));
          
          if (parsed.tags && parsed.tags.length > 0 && validTags.length === 0) {
            console.error(`  Warning: Gemini returned tags but none were valid for ${filename}`);
            console.error(`  Returned tags:`, parsed.tags);
            console.error(`  (Tags must be from the known tags list)`);
          }
          
          if (!parsed.tags || parsed.tags.length === 0) {
            console.error(`  Warning: Gemini returned no tags for ${filename}`);
            console.error(`  Full response text: ${text}`);
          }
          
          return { 
            tags: validTags, 
            skip: Boolean(parsed.skip),
            skipReason: parsed.skipReason || ""
          };
        } catch (parseError) {
          console.error(`  Error parsing Gemini JSON response for ${filename}:`, parseError);
          console.error(`  Response text was: ${text}`);
          return { tags: [], skip: false, skipReason: "" };
        }
      } else {
        console.error(`  Could not find JSON in Gemini response for ${filename}`);
        console.error(`  Response text: ${text}`);
        return { tags: [], skip: false, skipReason: "" };
      }
    } finally {
      if (fileName) {
        try {
          await fetch(
            `https://generativelanguage.googleapis.com/v1beta/${fileName}?key=${GEMINI_API_KEY}`,
            { method: "DELETE" }
          );
        } catch (deleteError) {
          console.error(`  Warning: Failed to delete uploaded file for ${filename}`);
        }
      }
    }
  } catch (error) {
    console.error(`  Error analyzing ${filename}:`, error);
    if (error instanceof Error) {
      console.error(`  Error message: ${error.message}`);
      console.error(`  Error stack: ${error.stack}`);
    }
  }

  return { tags: [], skip: false, skipReason: "" };
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
    console.error(`  Error generating smol bufo for ${filename}:`, error);
    if (error instanceof Error) {
      console.error(`  Error message: ${error.message}`);
    }
    try {
      fs.copyFileSync(sourcePath, smolPath);
    } catch (fallbackError) {
      console.error(`  Failed to copy original as fallback for ${filename}:`, fallbackError);
      throw fallbackError;
    }
  }
}

async function copyBufoToSite(id: string, fileType: string): Promise<void> {
  const filename = `${id}.${fileType}`;
  const sourcePath = path.join(ALL_THE_BUFO_DIR, filename);
  const destPath = path.join(path.resolve(__dirname, BUFOS_DIR), filename);
  
  try {
    fs.copyFileSync(sourcePath, destPath);
  } catch (error) {
    console.error(`  Error copying bufo ${filename} to site:`, error);
    if (error instanceof Error) {
      console.error(`  Error message: ${error.message}`);
    }
    throw error;
  }
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

  if (TEST_MODE && newBufos.length > TEST_MODE_LIMIT) {
    console.log(`Test mode: randomly selecting ${TEST_MODE_LIMIT} bufos from ${newBufos.length} available\n`);
    
    for (let i = newBufos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newBufos[i], newBufos[j]] = [newBufos[j], newBufos[i]];
    }
    
    newBufos = newBufos.slice(0, TEST_MODE_LIMIT);
    
    console.log("Selected bufos for processing:");
    newBufos.forEach((file, idx) => {
      console.log(`  ${idx + 1}. ${file}`);
    });
    console.log("");
  }

  // Ensure directories exist
  const bufosDir = path.resolve(__dirname, BUFOS_DIR);
  const smolBufosDir = path.resolve(__dirname, SMOL_BUFOS_DIR);
  if (!fs.existsSync(bufosDir)) fs.mkdirSync(bufosDir, { recursive: true });
  if (!fs.existsSync(smolBufosDir)) fs.mkdirSync(smolBufosDir, { recursive: true });

  // Process each new bufo
  let addedCount = 0;
  let skippedCount = 0;
  
  for (const filename of newBufos) {
    console.log(`Processing: ${filename}`);
    
    try {
      const sourcePath = path.join(ALL_THE_BUFO_DIR, filename);
      
      const lastDotIndex = filename.lastIndexOf(".");
      const id = filename.substring(0, lastDotIndex);
      const fileType = filename.substring(lastDotIndex + 1);
      
      const result = await analyzeBufoWithGemini(filename, sourcePath);

      if (result.skip) {
        skipList.skipped.push({
          id,
          fileType,
          reason: result.skipReason
        });
        console.log(`  Skipped: ${filename} (reason: ${result.skipReason})`);
        skippedCount++;
      } else {
        bufoData.bufos.push({
          id,
          fileType,
          tags: result.tags
        });

        await copyBufoToSite(id, fileType);
        await generateSmolBufo(id, fileType);
        console.log(`  Added: ${filename} with tags: [${result.tags.join(", ")}]`);
        addedCount++;
      }

      if (GEMINI_API_KEY) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error(`  CRITICAL ERROR processing ${filename}:`, error);
      if (error instanceof Error) {
        console.error(`  Error message: ${error.message}`);
        console.error(`  Error stack: ${error.stack}`);
      }
      console.error(`  Skipping this bufo and continuing with next one...`);
    }
  }

  // Save updated data
  saveBufoData(bufoData);
  saveSkipList(skipList);
  
  console.log(`\nDone! Added ${addedCount} new bufos, skipped ${skippedCount}, processed ${newBufos.length} total.`);
}

main().catch(console.error);
