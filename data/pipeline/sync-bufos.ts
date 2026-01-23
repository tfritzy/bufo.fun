import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

// Configuration
const ALL_THE_BUFO_DIR = "/tmp/all-the-bufo/all-the-bufo";
const BUFO_DATA_PATH = "../../site/public/bufo-data.json";
const BUFOS_DIR = "../../site/public/bufos";
const SMOL_BUFOS_DIR = "../../site/public/smolBufos";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Types
interface BufoEntry {
  name: string;
  filename: string;
  tags: string[];
  skip: boolean;
}

interface BufoData {
  tags: string[];
  bufos: BufoEntry[];
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

// Pattern for tiling bufos that should be skipped
const TILING_PATTERNS = [
  /^bigbufo_\d+_\d+\.(png|gif|jpg|jpeg|webp)$/i,
];

function isTilingBufo(filename: string): boolean {
  return TILING_PATTERNS.some(pattern => pattern.test(filename));
}

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

function getExistingBufoFilenames(data: BufoData): Set<string> {
  return new Set(data.bufos.map(b => b.filename));
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

async function tagBufoWithGemini(filename: string, imagePath: string): Promise<{ tags: string[], skip: boolean }> {
  if (!GEMINI_API_KEY) {
    console.log(`  No Gemini API key, using default tags for: ${filename}`);
    return { tags: [], skip: false };
  }

  try {
    // Read the image and convert to base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");
    const mimeType = imagePath.endsWith(".gif") ? "image/gif" : 
                     imagePath.endsWith(".png") ? "image/png" :
                     imagePath.endsWith(".webp") ? "image/webp" : "image/jpeg";

    const prompt = `You are analyzing a "bufo" emoji/sticker image. Bufo is a cute cartoon frog character used in messaging apps.

Based on this image and its filename "${filename}", provide:
1. A list of appropriate tags from this allowed list: ${KNOWN_TAGS.join(", ")}
2. Whether this bufo should be skipped (set to true if it's:
   - A tiling/grid piece (part of a larger image split into tiles)
   - Not actually a bufo/frog
   - Inappropriate content
   - Too low quality to use)

Respond ONLY with valid JSON in this exact format:
{"tags": ["tag1", "tag2"], "skip": false}`;

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
      console.log(`  Gemini API error for ${filename}: ${response.status}`);
      return { tags: [], skip: false };
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
      const parsed = JSON.parse(jsonMatch[0]);
      const validTags = (parsed.tags || []).filter((t: string) => KNOWN_TAGS.includes(t));
      return { tags: validTags, skip: Boolean(parsed.skip) };
    }
  } catch (error) {
    console.log(`  Error tagging ${filename}:`, error);
  }

  return { tags: [], skip: false };
}

async function generateSmolBufo(sourceFile: string, destPath: string): Promise<void> {
  const bufosDir = path.resolve(__dirname, BUFOS_DIR);
  const smolBufosDir = path.resolve(__dirname, SMOL_BUFOS_DIR);
  
  const sourcePath = path.join(bufosDir, sourceFile);
  const smolPath = path.join(smolBufosDir, sourceFile);

  try {
    if (sourceFile.endsWith(".gif")) {
      // Copy GIFs as-is (sharp doesn't handle animated GIFs well for resizing)
      fs.copyFileSync(sourcePath, smolPath);
    } else {
      await sharp(sourcePath)
        .resize(64, 64)
        .toFile(smolPath);
    }
  } catch (error) {
    console.log(`  Error generating smol bufo for ${sourceFile}:`, error);
    // Copy original as fallback
    fs.copyFileSync(sourcePath, smolPath);
  }
}

async function copyBufoToSite(sourceFile: string): Promise<void> {
  const sourcePath = path.join(ALL_THE_BUFO_DIR, sourceFile);
  const destPath = path.join(path.resolve(__dirname, BUFOS_DIR), sourceFile);
  
  fs.copyFileSync(sourcePath, destPath);
}

async function main() {
  console.log("Starting bufo sync pipeline...\n");

  // Load existing data
  const bufoData = loadBufoData();
  const existingFilenames = getExistingBufoFilenames(bufoData);
  console.log(`Found ${existingFilenames.size} existing bufos in data file`);

  // Get source files
  const sourceFiles = getSourceBufoFiles();
  console.log(`Found ${sourceFiles.length} bufos in all-the-bufo repository\n`);

  // Find new bufos
  const newBufos = sourceFiles.filter(file => !existingFilenames.has(file));
  console.log(`Found ${newBufos.length} new bufos to process\n`);

  if (newBufos.length === 0) {
    console.log("No new bufos to add. Done!");
    return;
  }

  // Ensure directories exist
  const bufosDir = path.resolve(__dirname, BUFOS_DIR);
  const smolBufosDir = path.resolve(__dirname, SMOL_BUFOS_DIR);
  if (!fs.existsSync(bufosDir)) fs.mkdirSync(bufosDir, { recursive: true });
  if (!fs.existsSync(smolBufosDir)) fs.mkdirSync(smolBufosDir, { recursive: true });

  // Process each new bufo
  let addedCount = 0;
  for (const filename of newBufos) {
    console.log(`Processing: ${filename}`);
    
    const sourcePath = path.join(ALL_THE_BUFO_DIR, filename);
    const name = filename.replace(/\.[^/.]+$/, ""); // Remove extension
    
    // Check if it's a tiling bufo (auto-skip)
    const isTiling = isTilingBufo(filename);
    
    let tags: string[] = [];
    let skip = isTiling;
    
    if (!isTiling) {
      // Get tags from Gemini
      const geminiResult = await tagBufoWithGemini(filename, sourcePath);
      tags = geminiResult.tags;
      skip = geminiResult.skip;
    } else {
      console.log(`  Auto-skipping tiling bufo: ${filename}`);
    }

    // Add to data
    bufoData.bufos.push({
      name,
      filename,
      tags,
      skip
    });

    // Copy files if not skipped
    if (!skip) {
      await copyBufoToSite(filename);
      await generateSmolBufo(filename, smolBufosDir);
      console.log(`  Added: ${filename} with tags: [${tags.join(", ")}]`);
      addedCount++;
    } else {
      console.log(`  Skipped: ${filename}`);
    }

    // Rate limiting for Gemini API
    if (!isTiling && GEMINI_API_KEY) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // Save updated data
  saveBufoData(bufoData);
  console.log(`\nDone! Added ${addedCount} new bufos, processed ${newBufos.length} total.`);
}

main().catch(console.error);
