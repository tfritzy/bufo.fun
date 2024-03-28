import React from "react";
import { TruncatedText } from "./components/TruncatedText";
import { BufoDetails } from "./types";

type BufoProps = {
  bufo: BufoDetails;
  onClick?: (index: number) => void;
  index: number;
};

export const BufoItem = (props: BufoProps) => {
  const { onClick } = props;

  const handleClick = React.useCallback(() => {
    if (props.onClick) {
      props.onClick(props.index);
    }
  }, [onClick, props.index]);

  return (
    <div className="w-[64px] min-w-[64px] m-2">
      <button
        onClick={handleClick}
        className="focus:outline-none focus:ring-2 focus:ring-bufo-200 focus:shadow-sm rounded transition-all duration-200 ease-in-out"
      >
        <div className="rounded w-[64px] min-w-[64px] h-[64px] min-h-[64px] border border-bufo-400 bg-bufo-50">
          <img
            src={props.bufo.image}
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
