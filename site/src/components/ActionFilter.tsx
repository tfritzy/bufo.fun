type ActionFilterProps = {
  onClick: () => void;
  count: number;
  name: string;
  selected: boolean;
};

export const ActionFilter = (props: ActionFilterProps) => {
  const colorStyling = props.selected
    ? "bg-bufo-50 text-bufo-500 border-bufo-200"
    : "bg-white text-gray-800 border-gray-200";

  return (
    <button
      className={`px-2 py-1 rounded text-sm border ${colorStyling}`}
      onClick={props.onClick}
    >
      <div className="flex flex-row space-x-1">
        <div className="">{props.name}</div>
        <div className="rounded-full px-1 font-semibold">{props.count}</div>
      </div>
    </button>
  );
};
