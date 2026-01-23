import { useState, useMemo } from "react";
import { Bufo } from "./types";

export function useSearch(bufos: Bufo[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredBufos = useMemo(() => {
    return bufos.filter((bufo) => {
      // Filter by tag
      if (selectedTag && !bufo.tags.includes(selectedTag)) {
        return false;
      }

      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesId = bufo.id.toLowerCase().includes(term);
        const matchesTags = bufo.tags.some((tag) =>
          tag.toLowerCase().includes(term)
        );
        return matchesId || matchesTags;
      }

      return true;
    });
  }, [bufos, searchTerm, selectedTag]);

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    bufos.forEach((bufo) => {
      bufo.tags.forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1);
      });
    });
    return counts;
  }, [bufos]);

  return {
    searchTerm,
    setSearchTerm,
    selectedTag,
    setSelectedTag,
    filteredBufos,
    tagCounts,
  };
}
