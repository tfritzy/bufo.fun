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

 if (BufoData.length === 0) {
  return (
   <div className="w-screen h-screen flex flex-col justify-center items-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-bufo-400">
     <img
      src="/bufos/bufo-late-to-the-convo.png"
      width="32px"
      height="32px"
      aria-label="loading"
     />
    </div>
   </div>
  );
 }

 return (
  <div className="overflow-y-scroll min-h-screen max-h-screen bg-gray-100">
   <div className="flex flex-col items-start max-w-3xl m-auto">
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
