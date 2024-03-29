import React from "react";
import { useCookies } from "react-cookie";

export const Tutorial = () => {
  const [cookies, setCookie] = useCookies(["tutorial-dismissed"]);

  const handleClick = () => {
    setCookie("tutorial-dismissed", "true", { path: "/" });
  };

  console.log(cookies["tutorial-dismissed"]);

  if (cookies["tutorial-dismissed"] === true) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 text-sm">
      <img
        src="bufos/bufo-highfive-1.png"
        width="64px"
        height="64px"
        aria-label="bufo-tutorial"
      />
      <div className="absolute w-48 bottom-12 left-12 bg-white rounded-lg p-2 border shadow-sm">
        <div>
          <code>Shift+click</code> to quickly download specific bufos.
        </div>
        <div className="w-full flex flex-col items-end">
          <button
            className="bg-bufo-400 w-min mt-2 text-white border border-gray-300 px-2 rounded"
            onClick={handleClick}
          >
            Thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
