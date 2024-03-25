import React from "react";
import { BufoItem } from "./BufoItem";
import { BufoInspector } from "./BufoInspector";
import { BufoDetails } from "./types";

type BufoListProps = {
  bufoData: BufoDetails[];
  filter: string;
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

  const filteredBufos = new Set(
    props.bufoData.filter((bufo) => bufo.name.includes(props.filter))
  );

  return (
    <div className="w-full">
      <div className="ml-2">{filteredBufos.size} bufos</div>
      <div className="flex flex-row flex-wrap">
        {props.bufoData.map((bufo, index) => {
          return (
            <div key={index} hidden={!filteredBufos.has(bufo)}>
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
