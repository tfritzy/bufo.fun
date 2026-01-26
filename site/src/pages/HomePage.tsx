import { useBufos } from "../BufoContext";
import { useSearch } from "../useSearch";
import { SearchBar } from "../components/SearchBar";
import { BufoGrid } from "../components/BufoGrid";
import { Tutorial } from "../components/Tutorial";
import { CornerBufo } from "../components/CornerBufo";
import { SEO } from "../components/SEO";

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-bufo-500">Loading bufos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Home - Bufo Emoji Repository"
        description="A repository of bufo emojis, that can be exported to add to your discord and slack servers. Bufo is a charismatic frog, that is sometimes referred to as 'froge'."
        keywords="bufo, frog, emoji, discord, slack, bufo.fun, froge, emojis, repository"
        url="https://bufo.fun/"
      />
      <div className="container mx-auto">
        <div className="mb-2 mt-4">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
            tagCounts={tagCounts}
            allTags={allTags}
          />
        </div>

        <BufoGrid bufos={filteredBufos} onTagClick={setSelectedTag} />
      </div>

      <CornerBufo />
      <Tutorial />
    </>
  );
}
