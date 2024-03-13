import React from "react";
import { Bufo } from "./Bufo";

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xl p-4 bg-white shadow-md grid grid-cols-4 gap-2">
        <Bufo name="australian-bufo" />
        <Bufo name="awesomebufo" />
        <Bufo name="wreck-it-bufo" />
        <Bufo name="up-and-to-the-bufo" />
        <Bufo name="the-more-you-bufo" />
        <Bufo name="the-bufo-we-deserve" />
        <Bufo name="ted-bufo" />
        <Bufo name="tabufo" />
        <Bufo name="super-bufo" />
        <Bufo name="so-bufoful" />
        <Bufo name="paper-bufo" />
        <Bufo name="not-bufo" />
      </div>
    </div>
  );
}

export default App;
