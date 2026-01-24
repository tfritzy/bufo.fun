import { useBufos } from "./BufoContext";
import { useSearch } from "./useSearch";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { BufoGrid } from "./components/BufoGrid";
import { Tutorial } from "./components/Tutorial";
import { CornerBufo } from "./components/CornerBufo";

export function App() {
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
      <div className="overflow-y-scroll min-h-screen max-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-bufo-500">Loading bufos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-y-scroll min-h-screen max-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="overflow-y-scroll min-h-screen max-h-screen bg-gray-100">
      <div className="flex flex-col items-start max-w-4xl m-auto">
        <Header />

        <div className="mx-2 mb-2">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
            tagCounts={tagCounts}
            allTags={allTags}
          />
        </div>

        <BufoGrid bufos={filteredBufos} />
      </div>

      <CornerBufo />
      <Tutorial />
    </div>
  );
}

export default App;
