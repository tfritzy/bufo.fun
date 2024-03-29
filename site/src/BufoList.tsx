import React from "react";
import { BufoItem } from "./BufoItem";
import { BufoInspector } from "./BufoInspector";
import { BufoDetails } from "./types";
import { fetchAndZipFiles } from "./downloadBufo";

type BufoListProps = {
  bufoData: BufoDetails[];
  matchingBufos: Set<string>;
};

export const BufoList = (props: BufoListProps) => {
  const [inspectedIndex, setInspectedIndex] = React.useState<number | null>(
    null
  );

  const memodBufos: Map<string, JSX.Element> = React.useMemo(() => {
    const dBufos = new Map<string, JSX.Element>();
    props.bufoData.forEach((bufo, index) => {
      dBufos.set(
        bufo.name,
        <BufoItem
          bufo={bufo}
          key={index}
          onClick={(index) => setInspectedIndex(index)}
          index={index}
        />
      );
    });
    return dBufos;
  }, [props.bufoData]);

  return (
    <div className="w-full">
      <div className="ml-2 text-sm text-bufo-500 flex flex-row space-x-1 items-center">
        <div>
          <span className="font-semibold">{props.matchingBufos.size}</span>{" "}
          bufos
        </div>
        <button
          className="font-semibold"
          onClick={() => fetchAndZipFiles(props.matchingBufos, props.bufoData)}
        >
          <svg
            width="16px"
            height="16px"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-bufo-500"
          >
            <path
              d="M9 17L15 17"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12 6V13M12 13L15.5 9.5M12 13L8.5 9.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex flex-row flex-wrap">
        {props.bufoData.map((bufo, index) => {
          return (
            <div key={index} hidden={!props.matchingBufos.has(bufo.name)}>
              {memodBufos.get(bufo.name)}
            </div>
          );
        })}
      </div>
      <BufoInspector
        bufo={props.bufoData[inspectedIndex || 0]}
        onClose={() => setInspectedIndex(null)}
        isOpen={inspectedIndex !== null}
      />
    </div>
  );
};
