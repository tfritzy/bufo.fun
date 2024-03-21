import React from "react";
import { BufoData } from "./BufoData";
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
    BufoData.forEach((bufo, index) => {
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

  return (
    <>
      <div className="w-full flex flex-row flex-wrap">
        {BufoData.map((bufo, index) => (
          <div hidden={!bufo.name.includes(props.filter)} key={index}>
            {memodBufos.get(bufo.name)}
          </div>
        ))}
      </div>
      <BufoInspector
        bufo={BufoData[inspectedIndex || 0]}
        onClose={() => setInspectedIndex(null)}
        isOpen={inspectedIndex !== null}
        blobUrl={
          props.bufoBlobUrls.get(BufoData[inspectedIndex || 0].name) || ""
        }
      />
    </>
  );
};
