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
  name: string;
  filename: string;
  tags: string[];
  skip: boolean;
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
const bufos = bufoData.bufos.filter(b => !b.skip);

if (!existsSync(smolBufoDirectory)) {
 mkdirSync(smolBufoDirectory);
}

for (const bufo of bufos) {
 if (bufo.filename.endsWith(".gif")) {
  console.log(`Copying ${bufo.filename}`);
  writeFileSync(
   `${smolBufoDirectory}/${bufo.filename}`,
   readFileSync(`${allTheBufoDirectory}/${bufo.filename}`)
  );
 } else {
  console.log(`Resizing ${bufo.filename}`);
  sharp(`${allTheBufoDirectory}/${bufo.filename}`)
   .resize(64, 64)
   .toFile(`${smolBufoDirectory}/${bufo.filename}`);
 }
}
