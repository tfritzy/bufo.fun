import {
 readdirSync,
 existsSync,
 rmdirSync,
 writeFileSync,
} from "fs";
import sharp from "sharp";
import { BufoData } from "../../site/src/BufoData";
import fs from "fs";

const allTheBufoDirectory = "site/public/bufos";
const smolBufoDirectory = "site/public/smolBufos";

const bufoFiles = readdirSync(allTheBufoDirectory);

if (!fs.existsSync(smolBufoDirectory)) {
 fs.mkdirSync(smolBufoDirectory);
}

for (const bufo of BufoData) {
 if (bufo.filename.endsWith(".gif")) {
  console.log(`Copying ${bufo.filename}`);
  writeFileSync(
   `${smolBufoDirectory}/${bufo.filename}`,
   fs.readFileSync(
    `${allTheBufoDirectory}/${bufo.filename}`
   )
  );
 } else {
  console.log(`Resizing ${bufo.filename}`);
  sharp(`${allTheBufoDirectory}/${bufo.filename}`)
   .resize(64, 64)
   .toFile(`${smolBufoDirectory}/${bufo.filename}`);
 }
}
