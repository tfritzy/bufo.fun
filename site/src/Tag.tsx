import React from "react";
import { Tag } from "../../data/pipeline/BufoData";

type TagComponentProps = {
  tag: Tag;
  onClick: (tag: Tag) => void;
};

export const TagComponent = (props: TagComponentProps) => {
  return (
    <button
      className="m-1 px-2 py-1 border rounded-full bg-blue-100"
      onClick={() => props.onClick(props.tag)}
    >
      {props.tag}
    </button>
  );
};
