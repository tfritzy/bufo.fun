type BufoSearchProps = {
  onSearch: (query: string) => void;
};

export const BufoSearch = (props: BufoSearchProps) => {
  return (
    <input
      className="w-72 px-3 py-1 rounded-lg border border-gray-200 focus:border-bufo-200  text-bufo-500 focus:outline-none focus:ring-2 focus:ring-bufo-200 transition-all duration-200 ease-in-out"
      type="text"
      placeholder="Search..."
      onChange={(e) => props.onSearch(e.target.value)}
    />
  );
};
