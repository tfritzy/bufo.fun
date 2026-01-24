import React from "react";
import { Header } from "./Header";
import { BufoSearch } from "./BufoSearch";
import { BufoList } from "./BufoList";
import { CornerBufos } from "./CornerBufos";
import { Tutorial } from "./Tutorial";
import { Tag } from "./BufoData";

function App() {
 const [matchBufos, setMatchBufos] = React.useState<
  Set<string>
 >(new Set());
 const [selectedTag, setSelectedTag] = React.useState<Tag | null>(null);

 const handleTagClick = (tagName: string) => {
  setSelectedTag(tagName as Tag);
 };

 return (
  <div className="overflow-y-scroll min-h-screen max-h-screen bg-gray-100">
   <div className="flex flex-col items-start max-w-4xl m-auto">
    <Header />

    <div className="mx-2 mb-2">
     <BufoSearch 
      setMatchingBufos={setMatchBufos} 
      selectedTag={selectedTag}
      setSelectedTag={setSelectedTag}
     />
    </div>

    <BufoList matchingBufos={matchBufos} onTagClick={handleTagClick} />
   </div>

   <CornerBufos />

   <Tutorial />
  </div>
 );
}

export default App;
