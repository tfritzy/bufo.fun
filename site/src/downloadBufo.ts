import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import type { BufoDetails } from "./BufoData";

export const downloadBufo = (filename: string) => {
 const link = document.createElement("a");
 link.href = "/bufos/" + filename;
 link.download = filename;
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
};

export const fetchAndZipFiles = async (
 names: Set<string>,
 bufoData: BufoDetails[]
) => {
 const zip = new JSZip();

 const fullBufos: BufoDetails[] = Array.from(names)
  .map((name) => {
   return bufoData.find((bufo) => bufo.name === name);
  })
  .filter((bufo) => bufo !== undefined) as BufoDetails[];

 // Fetch and add each file to the zip
 const filePromises = Array.from(fullBufos).map(
  async (bufo) => {
   try {
    const response = await fetch(`/bufos/${bufo.filename}`);
    if (!response.ok) {
     throw new Error(
      `Failed to fetch ${bufo.filename}: ${response.statusText}`
     );
    }
    const blob = await response.blob();
    zip.file(bufo.filename, blob, { binary: true });
   } catch (err) {
    console.error("Error fetching file: ", err);
   }
  }
 );

 // Wait for all files to be added
 await Promise.all(filePromises);

 // Generate zip file and trigger download
 zip
  .generateAsync({ type: "blob" })
  .then((content) => {
   saveAs(content, "bufopack.zip");
  })
  .catch((err) => {
   console.error("Error generating zip file: ", err);
  });
};
