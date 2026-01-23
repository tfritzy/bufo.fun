import React from "react";
import { Header } from "./Header";
import { BufoSearch } from "./BufoSearch";
import { BufoList } from "./BufoList";
import { CornerBufos } from "./CornerBufos";
import { Tutorial } from "./Tutorial";
import { loadBufoData, BufoDetails } from "./BufoData";

function App() {
 const [bufoData, setBufoData] = React.useState<BufoDetails[]>([]);
 const [matchBufos, setMatchBufos] = React.useState<
  Set<string>
 >(new Set());
 const [loading, setLoading] = React.useState(true);

 React.useEffect(() => {
  loadBufoData().then((data) => {
   setBufoData(data);
   setLoading(false);
  });
 }, []);

 if (loading) {
  return (
   <div className="overflow-y-scroll min-h-screen max-h-screen bg-gray-100 flex items-center justify-center">
    <div className="text-bufo-500">Loading bufos...</div>
   </div>
  );
 }

 return (
  <div className="overflow-y-scroll min-h-screen max-h-screen bg-gray-100">
   <div className="flex flex-col items-start max-w-4xl m-auto">
    <Header />

    <div className="mx-2 mb-2">
     <BufoSearch setMatchingBufos={setMatchBufos} bufoData={bufoData} />
    </div>

    <BufoList matchingBufos={matchBufos} bufoData={bufoData} />
   </div>

   <CornerBufos />

   <Tutorial />
  </div>
 );
}

export default App;
