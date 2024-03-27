import { readdirSync, existsSync, rmdirSync, writeFileSync } from "fs";
import { BufoMetadata } from "./BufoData";
import type { BufoDetails } from "./BufoData";
import sharp from "sharp";
import fs from "fs";

const outputDirectory = "site/public/bufoData.json";
const allTheBufoDirectory = "site/public/all-the-bufo/all-the-bufo";

const bufoFiles = readdirSync(allTheBufoDirectory);

const bufosWithMetadata = [];
for (const bufoMetadata of BufoMetadata) {
  if (bufoFiles.includes(bufoMetadata.name) && !bufoMetadata.skip) {
    bufosWithMetadata.push(bufoMetadata);
  }
}

if (existsSync(outputDirectory)) {
  rmdirSync(outputDirectory, { recursive: true });
}

const bufoImageData: Record<string, BufoDetails> = {};
for (const bufo of bufosWithMetadata) {
  const imageType = bufo.name.split(".").pop();
  let imageData;
  if (imageType !== "gif") {
    const buffer = sharp(`${allTheBufoDirectory}/${bufo.name}`)
      .resize(64, 64)
      .png()
      .toBuffer();
    imageData = `data:image/png;base64,${(await buffer).toString("base64")}`;
  } else {
    const buffer = fs.readFileSync(`${allTheBufoDirectory}/${bufo.name}`);
    imageData = `data:image/${imageType};base64,${buffer.toString("base64")}`;
  }

  bufoImageData[bufo.name] = {
    name: bufo.name,
    tags: bufo.tags,
    image: imageData,
  };
}

writeFileSync(outputDirectory, JSON.stringify(bufoImageData));
