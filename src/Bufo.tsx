import React from "react";

type BufoProps = {
  name: string;
};

export const Bufo = (props: BufoProps) => {
  const truncatedName =
    props.name.length > 12 ? `${props.name.substring(0, 12)}...` : props.name;

  return (
    <div className="w-max">
      <img
        src={`/all-the-bufo/${props.name}.png`}
        alt={props.name}
        className="rounded w-20 h-20 border border-green-400 shadow-sm bg-green-50"
      />
      <span className="block text-center text-xs text-gray-500">
        {truncatedName}
      </span>
    </div>
  );
};
