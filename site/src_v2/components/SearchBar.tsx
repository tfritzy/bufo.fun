import { useMemo } from "react";
import { TagFilter } from "./TagFilter";

const MAIN_TAGS = [
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

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  tagCounts: Map<string, number>;
  allTags: string[];
}

export function SearchBar({
  searchTerm,
  onSearchChange,
  selectedTag,
  onTagSelect,
  tagCounts,
  allTags,
}: SearchBarProps) {
  const visibleTags = useMemo(() => {
    const tags = new Set(MAIN_TAGS);
    if (selectedTag) {
      tags.add(selectedTag);
    }
    return Array.from(tags);
  }, [selectedTag]);

  const nonMainTags = useMemo(() => {
    return allTags.filter((tag) => !MAIN_TAGS.includes(tag)).sort();
  }, [allTags]);

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-72 px-3 py-1 rounded-md border border-gray-200 focus:border-bufo-200 text-bufo-500 focus:outline-none focus:ring-2 focus:ring-bufo-200 transition-all duration-200 ease-in-out"
      />

      <div>
        {visibleTags.map((tag) => (
          <TagFilter
            key={tag}
            name={tag}
            count={tagCounts.get(tag) || 0}
            selected={selectedTag === tag}
            onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
          />
        ))}
        <select
          className="px-2 py-1 rounded text-sm border bg-white text-gray-800 border-gray-200"
          onChange={(e) => {
            const tag = e.target.value;
            onTagSelect(tag === "all" ? null : tag);
          }}
          value=""
        >
          <option disabled value="">
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
  );
}
