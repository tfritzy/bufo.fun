import React from "react";
import { Bufo } from "./Bufo";
import { BufoData } from "./BufoData";
import { BufoInspector } from "./BufoInspector";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  const [inspectedIndex, setInspectedIndex] = React.useState<number | null>(
    null
  );

  return (
    <NextUIProvider>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-2xl p-4 bg-white shadow-md flex flex-row flex-wrap max-h-screen overflow-y-scroll">
          {BufoData.map((bufo, index) => (
            <Bufo
              key={bufo.name}
              name={bufo.name}
              fileExtension={bufo.type}
              onClick={() => setInspectedIndex(index)}
            />
          ))}
        </div>
        <BufoInspector
          bufo={BufoData[inspectedIndex || 0]}
          onClose={() => setInspectedIndex(null)}
          isOpen={inspectedIndex !== null}
        />
      </div>
    </NextUIProvider>
  );
}

export default App;
