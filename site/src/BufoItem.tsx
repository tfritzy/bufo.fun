import React from "react";
import type { BufoDetails } from "./BufoData";
import { downloadBufo } from "./downloadBufo";

type BufoProps = {
 bufo: BufoDetails;
 onClick?: (index: number) => void;
 index: number;
};

export const BufoItem = (props: BufoProps) => {
 const { onClick } = props;

 const handleClick = React.useCallback(
  (event: React.MouseEvent<HTMLButtonElement>) => {
   if (event.shiftKey) {
    downloadBufo(props.bufo.filename);
   } else {
    if (onClick) {
     onClick(props.index);
    }
   }
  },
  [onClick, props.index]
 );

 const handleKeyDown = React.useCallback(
  (event: React.KeyboardEvent<HTMLButtonElement>) => {
   if (event.key === "d") {
    downloadBufo(props.bufo.filename);
   }
  },
  [props.bufo.filename]
 );

 return (
  <div className="w-[64px] min-w-[64px] m-2">
   <button
    onClick={handleClick}
    onKeyDown={handleKeyDown}
    className="focus:outline-none focus:ring-2 focus:ring-bufo-300 focus:shadow-sm rounded transition-all duration-200 ease-in-out"
   >
    <div className="rounded w-[64px] min-w-[64px] h-[64px] min-h-[64px] border border-bufo-400 bg-bufo-50">
     <img
      src={`/smolBufos/${props.bufo.filename}`}
      aria-label={props.bufo.name}
      title={props.bufo.name}
      className="w-full h-full"
     />
    </div>
   </button>
   <span className="block text-center text-[10px] text-bufo-500 whitespace-nowrap overflow-x-clip">
    {props.bufo.name}
   </span>
  </div>
 );
};
