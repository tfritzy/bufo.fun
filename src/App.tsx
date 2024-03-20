import React from "react";
import { Bufo } from "./Bufo";
import { BufoData } from "./BufoData";
import { BufoInspector } from "./BufoInspector";
import JSZip from "jszip";

function App() {
  const [imageUrls, setImageUrls] = React.useState<Map<string, string>>(
    new Map()
  );
  const [inspectedIndex, setInspectedIndex] = React.useState<number | null>(
    null
  );

  const fetchAndProcessZip = React.useCallback((zipPath: string) => {
    const startTime = Date.now();
    const secondsFromStart = () => ((Date.now() - startTime) / 1000).toFixed(2);
    console.log("Fetching zip folder starting at ", secondsFromStart());
    fetch(zipPath)
      .then((response) => {
        console.log("Got zip folder at ", secondsFromStart());
        if (response.status === 200 || response.status === 0) {
          return Promise.resolve(response.blob());
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      })
      .then((data) => {
        console.log("Starting unzip at ", secondsFromStart());
        return JSZip.loadAsync(data);
      })
      .then((zip) => {
        console.log("Unzipped at ", secondsFromStart());
        const promises: Promise<string[]>[] = [];

        console.log("Processing PNGs at ", secondsFromStart());
        zip.forEach((relativePath, file) => {
          const promise = file.async("blob").then((blob) => {
            return [URL.createObjectURL(blob), relativePath];
          });
          promises.push(promise);
        });

        // Wait for all PNGs to be processed
        Promise.all(promises).then((urls) => {
          const urlsMap = new Map<string, string>();
          urls.forEach(([url, relativePath]) => {
            let name = relativePath.split(".")[0];
            name = name.replace("all-the-bufo/", "");
            urlsMap.set(name, url);
          });
          setImageUrls(urlsMap);
        });
        console.log("Processed PNGs at ", secondsFromStart());
      })
      .catch((err) => {
        console.error("Error fetching or processing the ZIP file:", err);
      });
  }, []);

  React.useEffect(() => {
    fetchAndProcessZip("/all-the-bufo.zip");
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-4 shadow-md flex flex-row flex-wrap max-h-screen overflow-y-scroll">
        {BufoData.map((bufo, index) => (
          <Bufo
            key={bufo.name}
            name={bufo.name}
            onClick={() => setInspectedIndex(index)}
            blobUrl={imageUrls.get(bufo.name) || ""}
          />
        ))}
      </div>
      <BufoInspector
        bufo={BufoData[inspectedIndex || 0]}
        onClose={() => setInspectedIndex(null)}
        isOpen={inspectedIndex !== null}
        blobUrl={imageUrls.get(BufoData[inspectedIndex || 0].name) || ""}
      />
    </div>
  );
}

export default App;
