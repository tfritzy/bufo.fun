import React from "react";
import { Header } from "./Header";
import { BufoSearch } from "./BufoSearch";
import { BufoList } from "./BufoList";
import { CornerBufos } from "./CornerBufos";
import { Tutorial } from "./Tutorial";
import { BufoData } from "./BufoData";

function App() {
 const [matchBufos, setMatchBufos] = React.useState<
  Set<string>
 >(new Set());


 return (
  <div className="overflow-y-scroll min-h-screen max-h-screen bg-gray-100">
   <div className="flex flex-col items-start max-w-4xl m-auto">
    <Header />

    <div className="mx-2 mb-2">
     <BufoSearch setMatchingBufos={setMatchBufos} />
    </div>

    <BufoList matchingBufos={matchBufos} />
   </div>

   <CornerBufos />

   <Tutorial />
  </div>
 );
}

export default App;
