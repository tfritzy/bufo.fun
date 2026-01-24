interface TagFilterProps {
  name: string;
  count: number;
  selected: boolean;
  onClick: () => void;
}

export function TagFilter({ name, count, selected, onClick }: TagFilterProps) {
  const colorClass = selected
    ? "bg-bufo-100 text-bufo-600 border-bufo-400"
    : "bg-white border-gray-300 text-gray-700";

  return (
    <button
      className={`flex items-center gap-1.5 px-3 py-1.5 ${colorClass} border rounded shadow-sm hover:border-gray-400 transition-colors text-sm`}
      onClick={onClick}
    >
      <span className="font-normal">{name}</span>
      <span className="font-bold text-gray-900">{count}</span>
    </button>
  );
}
