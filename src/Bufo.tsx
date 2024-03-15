import React from "react";
import { TruncatedText } from "./components/TruncatedText";

type BufoProps = {
  name: string;
  fileExtension: string;
  onClick?: () => void;
};

export const Bufo = (props: BufoProps) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className="w-[64px] overflow-x-hidden m-2">
      <button onClick={props.onClick}>
        <img
          src={`/all-the-bufo/${props.name}.${props.fileExtension}`}
          alt={props.name}
          className="rounded w-[64px] h-[64px] border border-lime-400 shadow-md shadow-lime-50 bg-lime-50"
          title={props.name}
          onLoad={() => setLoaded(true)}
          style={{ visibility: loaded ? "visible" : "hidden" }}
        />
      </button>
      <span className="block text-center text-[10px] text-lime-600 whitespace-nowrap">
        <TruncatedText text={props.name} />
      </span>
    </div>
  );
};
