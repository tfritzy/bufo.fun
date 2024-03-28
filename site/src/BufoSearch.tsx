import React from "react";
import { BufoDetails } from "./types";

type BufoSearchProps = {
  bufoData: BufoDetails[];
  setMatchingBufos: (bufos: Set<string>) => void;
};

const setIncludesAny = (matchingTags: Set<string>, bufoTags: Set<string>) => {
  for (const tag of bufoTags) {
    if (matchingTags.has(tag)) {
      return true;
    }
  }
  return false;
};

export const BufoSearch = (props: BufoSearchProps) => {
  const [search, setSearch] = React.useState("");

  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    props.bufoData.forEach((bufo) => {
      bufo.tags.forEach((tag) => tags.add(tag));
    });
    return tags;
  }, [props.bufoData]);

  React.useEffect(() => {
    if (search === "") {
      props.setMatchingBufos(new Set(props.bufoData.map((b) => b.name)));
      return;
    }

    const matchingTags = new Set<string>();
    allTags.forEach((tag) => {
      if (tag.toLowerCase().includes(search.toLowerCase())) {
        matchingTags.add(tag);
      }
    });

    const matchingBufos = new Set<string>();
    props.bufoData.forEach((bufo) => {
      if (bufo.name.toLowerCase().includes(search.toLowerCase())) {
        matchingBufos.add(bufo.name);
      } else if (setIncludesAny(matchingTags, bufo.tags)) {
        matchingBufos.add(bufo.name);
      }
    });

    props.setMatchingBufos(matchingBufos);
  }, [search, props.bufoData]);

  return (
    <input
      className="w-72 px-3 py-1 rounded-md border border-gray-200 focus:border-bufo-200  text-bufo-500 focus:outline-none focus:ring-2 focus:ring-bufo-200 transition-all duration-200 ease-in-out"
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
