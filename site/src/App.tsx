import React from "react";
import JSZip from "jszip";
import { Header } from "./Header";
import { BufoSearch } from "./BufoSearch";
import { BufoList } from "./BufoList";

function App() {
  const [imageUrls, setImageUrls] = React.useState<Map<string, string>>(
    new Map()
  );
  const [filter, setFilter] = React.useState("");

  const fetchAndProcessZip = React.useCallback((zipPath: string) => {
    fetch(zipPath)
      .then((response) => {
        if (response.status === 200 || response.status === 0) {
          return Promise.resolve(response.blob());
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      })
      .then((data) => {
        return JSZip.loadAsync(data);
      })
      .then((zip) => {
        const promises: Promise<string[]>[] = [];

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
            urlsMap.set(relativePath, url);
          });
          setImageUrls(urlsMap);
        });
      })
      .catch((err) => {
        console.error("Error fetching or processing the ZIP file:", err);
      });
  }, []);

  React.useEffect(() => {
    fetchAndProcessZip("/bufo-pack.zip");
  }, []);

  return (
    <div className="overflow-y-scroll min-h-screen max-h-screen bg-gray-100">
      <Header />

      <div className="flex flex-col items-start max-w-3xl m-auto">
        <div className="mx-2 mb-1">
          <BufoSearch onSearch={setFilter} />
        </div>

        <BufoList bufoBlobUrls={imageUrls} filter={filter} />
      </div>
    </div>
  );
}

export default App;
