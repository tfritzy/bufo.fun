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

  return (
    <>
      <div className="w-full flex flex-row flex-wrap">
        {BufoData.map((bufo, index) => (
          <BufoItem
            key={bufo.name}
            name={bufo.name}
            onClick={() => setInspectedIndex(index)}
            blobUrl={props.bufoBlobUrls.get(bufo.name) || ""}
          />
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
