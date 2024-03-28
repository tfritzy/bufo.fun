import React from "react";
import { BufoDetails } from "./types";
import { ActionFilter } from "./components/ActionFilter";
import type { Tag as TagType } from "../../data/pipeline/BufoData";
import { Tag } from "./components/Tag";

type BufoSearchProps = {
  bufoData: BufoDetails[];
  setMatchingBufos: (bufos: Set<string>) => void;
};

const bufoHasEveryTag = (bufoTags: Set<string>, tags: Set<string>) => {
  for (const tag of tags) {
    if (!bufoTags.has(tag)) {
      return false;
    }
  }

  return true;
};

const doesBufoMatchFilter = (
  bufo: BufoDetails,
  search: string,
  selectedTags: Set<TagType>
) => {
  if (selectedTags.size > 0 && !bufoHasEveryTag(bufo.tags, selectedTags)) {
    return false;
  }

  if (bufo.name.toLowerCase().includes(search.toLowerCase())) {
    return true;
  }

  for (const tag of bufo.tags) {
    if (tag.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
  }

  return false;
};

export const BufoSearch = (props: BufoSearchProps) => {
  const [search, setSearch] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<Set<TagType>>(
    new Set()
  );
  const [showAllTags, setShowAllTags] = React.useState(false);

  const allTags: TagType[] = React.useMemo(() => {
    const tags = new Set<TagType>();
    props.bufoData.forEach((bufo) => {
      bufo.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [props.bufoData]);

  React.useEffect(() => {
    const matchingBufos = new Set<string>();
    props.bufoData.forEach((bufo) => {
      if (doesBufoMatchFilter(bufo, search, selectedTags)) {
        matchingBufos.add(bufo.name);
      }
    });

    props.setMatchingBufos(matchingBufos);
  }, [search, props.bufoData, selectedTags]);

  const shownTags = showAllTags ? allTags : allTags.slice(0, 16);

  return (
    <div className="flex flex-col space-y-4 mb-4">
      <input
        className="w-72 px-3 py-1 rounded-md border border-gray-200 focus:border-bufo-200  text-bufo-500 focus:outline-none focus:ring-2 focus:ring-bufo-200 transition-all duration-200 ease-in-out"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="">
        <div className="text-gray-700 text-sm">Filter by tag</div>
        <div>
          <div
            className={"" + (showAllTags ? "" : "max-h-[48px] overflow-hidden")}
          >
            {shownTags.map((tag) => (
              <ActionFilter
                key={tag}
                name={tag}
                count={props.bufoData.filter((b) => b.tags.has(tag)).length}
                selected={selectedTags.has(tag)}
                onClick={() => {
                  if (selectedTags.has(tag)) {
                    selectedTags.delete(tag);
                  } else {
                    selectedTags.add(tag);
                  }
                  setSelectedTags(new Set(selectedTags));
                }}
              />
            ))}
          </div>
          {showAllTags ? (
            <div className="relative w-full flex flex-row items-center border border-t-bufo-300">
              <button
                onClick={() => setShowAllTags(false)}
                className="border-bufo-300 bg-gray-50 border border-t-0 rounded-b-md text-sm absolute right-[50%] transform translate-x-[50%] px-2 text-bufo-500 top-0"
              >
                Show less
              </button>
            </div>
          ) : (
            <div className="relative w-full flex flex-row items-center border border-t-bufo-300">
              <button
                onClick={() => setShowAllTags(true)}
                className="border-bufo-300 bg-gray-50 border border-t-0 rounded-b-md text-sm absolute right-[50%] transform translate-x-[50%] px-2 text-bufo-500 top-0"
              >
                Show all
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
