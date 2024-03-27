import React from "react";
import { Header } from "./Header";
import { BufoSearch } from "./BufoSearch";
import { BufoList } from "./BufoList";
import { BufoDetails as SiteBufoDetails } from "./types";
import {
  BufoDetails as PipelineBufoDetails,
  Tag,
} from "../../data/pipeline/BufoData";

function App() {
  const [bufoData, setBufoData] = React.useState<SiteBufoDetails[]>([]);
  const [filter, setFilter] = React.useState("");

  const tags: Map<Tag, string[]> = React.useMemo(() => {
    const dTags = new Map<Tag, string[]>();
    bufoData.forEach((bufo) => {
      bufo.tags.forEach((tag) => {
        if (!dTags.has(tag)) {
          dTags.set(tag, []);
        }
        dTags.get(tag)?.push(bufo.name);
      });
    });

    return dTags;
  }, [bufoData]);

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
                tags: b.tags,
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
      <Header />

      <div className="flex flex-col items-start max-w-3xl m-auto">
        <div className="mx-2 mb-1">
          <BufoSearch onSearch={setFilter} />
        </div>

        {tags.size > 0 && (
          <div className="mx-2 mb-1 text-sm">
            <div className="flex flex-row flex-wrap">
              {Array.from(tags.keys()).map((tag) => {
                return (
                  <div
                    key={tag}
                    className="relative bg-bufo-100 rounded-full px-2 text-bufo-400 text-center m-1 text-center"
                  >
                    <span className="absolute right-0 -top-2 font-semibold px-2 text-xs">
                      {tags.get(tag)?.length}
                    </span>
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <BufoList bufoData={bufoData} filter={filter} />
      </div>
    </div>
  );
}

export default App;
