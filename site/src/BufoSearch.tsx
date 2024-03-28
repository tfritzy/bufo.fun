import React from "react";
import { BufoDetails } from "./types";
import { Tag } from "../../data/pipeline/BufoData";

type BufoSearchProps = {
  bufoData: BufoDetails[];
  setMatchingBufos: (bufos: Set<string>) => void;
};

export const BufoSearch = (props: BufoSearchProps) => {
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (search === "") {
      props.setMatchingBufos(new Set(props.bufoData.map((b) => b.name)));
      return;
    }

    const searchTerms = search.split(" ");
    const matchingBufos = new Set<string>();
    for (const bufo of props.bufoData) {
      let matches = true;
      for (const term of searchTerms) {
        if (term.startsWith("-tag:")) {
          if (bufo.tags.includes(term.substring(5) as Tag)) {
            matches = false;
          }
        } else if (term.startsWith("tag:")) {
          if (!bufo.tags.includes(term.substring(4) as Tag)) {
            matches = false;
          }
        } else {
          if (!bufo.name.includes(term)) {
            matches = false;
          }
        }
      }

      if (matches) {
        matchingBufos.add(bufo.name);
      }
    }

    props.setMatchingBufos(matchingBufos);
  }, [search]);

  return (
    <div className="flex flex-col space-y-1">
      <input
        className="w-72 px-3 py-1 rounded-lg border border-gray-200 focus:border-bufo-200  text-bufo-500 focus:outline-none focus:ring-2 focus:ring-bufo-200 transition-all duration-200 ease-in-out"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="text-sm text-gray-500">
        Special terms:{" "}
        <span className="rounded border border-gray-400 bg-gray-100 font-mono px-1">
          tag:
        </span>{" "}
        <span className="rounded border border-gray-400 bg-gray-100 font-mono px-1">
          -tag:
        </span>
      </div>
    </div>
  );
};
