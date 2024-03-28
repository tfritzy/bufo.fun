import React from "react";
import { BufoDetails } from "./types";
import { ActionFilter } from "./components/ActionFilter";
import type { Tag, Tag as TagType } from "../../data/pipeline/BufoData";

type BufoSearchProps = {
  bufoData: BufoDetails[];
  setMatchingBufos: (bufos: Set<string>) => void;
};

const doesBufoMatchFilter = (
  bufo: BufoDetails,
  search: string,
  selectedTag?: TagType | null
) => {
  if (selectedTag && !bufo.tags.has(selectedTag)) {
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

const mainTags: Tag[] = [
  "core",
  "happy",
  "cry",
  "celebration",
  "cursed",
  "anger",
  "vegetable",
  "fruit",
  "anxiety",
  "cute",
  "baby",
  "encouragement",
  "upset",
];

export const BufoSearch = (props: BufoSearchProps) => {
  const [search, setSearch] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState<TagType | null>();

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
      if (doesBufoMatchFilter(bufo, search, selectedTag)) {
        matchingBufos.add(bufo.name);
      }
    });

    props.setMatchingBufos(matchingBufos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, props.bufoData, selectedTag]);

  const nonMainTags = React.useMemo(() => {
    let tags = new Set<TagType>(allTags);
    mainTags.forEach((tag) => tags.delete(tag));
    return Array.from(tags).sort();
  }, [allTags]);

  const visibleTags = React.useMemo(() => {
    const visibleTags = new Set<TagType>(mainTags);
    if (selectedTag) {
      visibleTags.add(selectedTag);
    }
    return Array.from(visibleTags);
  }, [selectedTag]);

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <input
        className="w-72 px-3 py-1 rounded-md border border-gray-200 focus:border-bufo-200  text-bufo-500 focus:outline-none focus:ring-2 focus:ring-bufo-200 transition-all duration-200 ease-in-out"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="">
        <div>
          {visibleTags.map((tag) => (
            <ActionFilter
              key={tag}
              name={tag}
              count={props.bufoData.filter((b) => b.tags.has(tag)).length}
              selected={selectedTag === tag}
              onClick={() => {
                setSelectedTag(tag === selectedTag ? null : tag);
              }}
            />
          ))}
          <select
            id="selected-tags"
            className="px-2 py-1 rounded text-sm border bg-white text-gray-800 border-gray-200"
            onChange={(e) => {
              const tag = e.target.value as TagType | "all";
              setSelectedTag(tag === "all" ? null : tag);
            }}
            value=""
          >
            <option disabled selected hidden value="">
              +{nonMainTags.length} more tags
            </option>
            {nonMainTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
