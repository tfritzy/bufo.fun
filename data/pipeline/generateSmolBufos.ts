import {
 readdirSync,
 existsSync,
 writeFileSync,
 readFileSync,
 mkdirSync,
} from "fs";
import sharp from "sharp";
import path from "path";

interface BufoEntry {
  id: string;
  fileType: string;
  tags: string[];
}

interface BufoData {
  tags: string[];
  bufos: BufoEntry[];
}

const allTheBufoDirectory = path.resolve(__dirname, "../../site/public/bufos");
const smolBufoDirectory = path.resolve(__dirname, "../../site/public/smolBufos");
const bufoDataPath = path.resolve(__dirname, "../../site/public/bufo-data.json");

// Load bufo data from JSON
const bufoData: BufoData = JSON.parse(readFileSync(bufoDataPath, "utf-8"));

if (!existsSync(smolBufoDirectory)) {
 mkdirSync(smolBufoDirectory);
}

for (const bufo of bufoData.bufos) {
 const filename = `${bufo.id}.${bufo.fileType}`;
 
 if (bufo.fileType === "gif") {
  console.log(`Copying ${filename}`);
  writeFileSync(
   `${smolBufoDirectory}/${filename}`,
   readFileSync(`${allTheBufoDirectory}/${filename}`)
  );
 } else {
  console.log(`Resizing ${filename}`);
  sharp(`${allTheBufoDirectory}/${filename}`)
   .resize(64, 64)
   .toFile(`${smolBufoDirectory}/${filename}`);
 }
}
