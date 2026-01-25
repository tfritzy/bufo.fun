interface TagFilterProps {
  name: string;
  count: number;
  selected: boolean;
  onClick: () => void;
}

export function TagFilter({ name, count, selected, onClick }: TagFilterProps) {
  const colorClass = selected
    ? "bg-bufo-50 text-bufo-500 border-bufo-200"
    : "bg-white text-gray-800 border-gray-200";

  return (
    <button
      className={`px-2 m-[1px] py-1 rounded text-sm border ${colorClass} focus:outline-none focus:ring-2 focus:ring-bufo-300 focus:shadow-sm transition-all duration-150 ease-in-out`}
      onClick={onClick}
    >
      <span className="flex flex-row space-x-1">
        <span>{name}</span>
        <span className="rounded-full px-1 font-semibold">{count}</span>
      </span>
    </button>
  );
}
