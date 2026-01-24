import { useBufos } from "../BufoContext";
import { useSearch } from "../useSearch";
import { SearchBar } from "../components/SearchBar";
import { BufoGrid } from "../components/BufoGrid";
import { Tutorial } from "../components/Tutorial";
import { CornerBufo } from "../components/CornerBufo";

export function HomePage() {
  const { bufos, allTags, loading, error } = useBufos();
  const {
    searchTerm,
    setSearchTerm,
    selectedTag,
    setSelectedTag,
    filteredBufos,
    tagCounts,
  } = useSearch(bufos);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-bufo-500">Loading bufos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-6 pb-32">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
          tagCounts={tagCounts}
          allTags={allTags}
        />

        <BufoGrid bufos={filteredBufos} />
      </div>

      <CornerBufo />
      <Tutorial />
    </>
  );
}
