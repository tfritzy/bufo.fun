import React from "react";
import { BufoMetadata } from "./BufoData";
import { BufoItem } from "./BufoItem";
import { BufoInspector } from "./BufoInspector";

type BufoListProps = {
  bufoBlobUrls: Map<string, string>;
  filter: string;
};

export const BufoList = (props: BufoListProps) => {
  const [inspectedIndex, setInspectedIndex] = React.useState<number | null>(
    null
  );

  const memodBufos: Map<string, JSX.Element> = React.useMemo(() => {
    const dBufos = new Map<string, JSX.Element>();
    BufoMetadata.forEach((bufo, index) => {
      if (bufo.skip) return;

      dBufos.set(
        bufo.name,
        <BufoItem
          key={index}
          name={bufo.name}
          blobUrl={props.bufoBlobUrls.get(bufo.name) || ""}
          onClick={(index) => setInspectedIndex(index)}
          index={index}
        />
      );
    });
    return dBufos;
  }, [props.bufoBlobUrls]);

  const filteredBufos = new Set(
    BufoMetadata.filter((bufo) => bufo.name.includes(props.filter))
  );

  return (
    <div className="w-full">
      <div>{filteredBufos.size} bufos</div>
      <div className="flex flex-row flex-wrap">
        {BufoMetadata.map((bufo, index) => {
          return (
            <div key={index} hidden={!filteredBufos.has(bufo)}>
              {memodBufos.get(bufo.name)}
            </div>
          );
        })}
      </div>
      <BufoInspector
        bufo={BufoMetadata[inspectedIndex || 0]}
        onClose={() => setInspectedIndex(null)}
        isOpen={inspectedIndex !== null}
        blobUrl={
          props.bufoBlobUrls.get(BufoMetadata[inspectedIndex || 0].name) || ""
        }
      />
    </div>
  );
};
