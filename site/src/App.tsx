import React from "react";
import { Header } from "./Header";
import { BufoSearch } from "./BufoSearch";
import { BufoList } from "./BufoList";
import { BufoDetails as SiteBufoDetails } from "./types";
import { BufoDetails as PipelineBufoDetails } from "../../data/pipeline/BufoData";

function App() {
  const [bufoData, setBufoData] = React.useState<SiteBufoDetails[]>([]);
  const [matchBufos, setMatchBufos] = React.useState<Set<string>>(new Set());

  const fetchAndProcessBufos = React.useCallback((dataPath: string) => {
    fetch(dataPath)
      .then((response) => {
        if (response.status === 200 || response.status === 0) {
          return Promise.resolve(response.blob());
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      })
      .then((data: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const bufoData: Record<string, PipelineBufoDetails> = JSON.parse(
            reader.result as string
          );
          setBufoData(
            Object.values(bufoData).map((b) => {
              return {
                name: b.name.split(".")[0],
                filename: b.name,
                tags: new Set(b.tags),
                image: b.image,
              };
            })
          );
        };
        reader.readAsText(data);
      })
      .catch((err) => {
        console.error("Error fetching or processing the bufo json file:", err);
      });
  }, []);

  React.useEffect(() => {
    fetchAndProcessBufos("/bufoData.json");
  }, []);

  return (
    <div className="overflow-y-scroll min-h-screen max-h-screen bg-gray-100">
      <div className="flex flex-col items-start max-w-3xl m-auto">
        <Header />

        <div className="mx-2 mb-2">
          <BufoSearch bufoData={bufoData} setMatchingBufos={setMatchBufos} />
        </div>

        <BufoList bufoData={bufoData} matchingBufos={matchBufos} />
      </div>
    </div>
  );
}

export default App;
