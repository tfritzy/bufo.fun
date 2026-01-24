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
    <div className="flex flex-col gap-4">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-bufo-500 focus:border-transparent outline-none transition-shadow shadow-sm"
        />
        <svg
          className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {visibleTags.map((tag) => (
          <TagFilter
            key={tag}
            name={tag}
            count={tagCounts.get(tag) || 0}
            selected={selectedTag === tag}
            onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
          />
        ))}
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded shadow-sm hover:border-gray-400 transition-colors text-sm text-gray-500"
          onClick={() => {}}
        >
          <span className="font-normal">+{nonMainTags.length} more tags</span>
        </button>
      </div>
    </div>
  );
}
