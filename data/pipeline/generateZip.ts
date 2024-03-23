import {
  readdirSync,
  mkdirSync,
  existsSync,
  rmdirSync,
  copyFileSync,
  writeFileSync,
} from "fs";
import { BufoMetadata } from "../../site/src/BufoData";
import type { BufoDetails } from "../../site/src/BufoData";
import {zipDirectory} from './zipDirectory';

const outputDirectory = "bufo-pack";
const allTheBufoDirectory = "../all-the-bufo/all-the-bufo";
const zipDestination = "../../../site/public/bufo-pack.zip";

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

mkdirSync(outputDirectory);
for (const bufo of bufosWithMetadata) {
  copyFileSync(
    `${allTheBufoDirectory}/${bufo.name}`,
    `${outputDirectory}/${bufo.name}`
  );
}

if (existsSync(zipDestination)) {
  rmdirSync(zipDestination);
}
zipDirectory(outputDirectory, zipDestination);
