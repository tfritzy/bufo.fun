import { Bufo } from "../types";
import { downloadBufo } from "../utils";

interface BufoCardProps {
  bufo: Bufo;
  onClick: () => void;
}

export function BufoCard({ bufo, onClick }: BufoCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (e.shiftKey) {
      downloadBufo(bufo);
    } else {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "d") {
      downloadBufo(bufo);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 group cursor-pointer">
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="w-full aspect-square bg-white rounded-md border border-gray-200 flex items-center justify-center p-1 group-hover:border-bufo-500/50 group-hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-bufo-300"
      >
        <img
          src={`/smolBufos/${bufo.filename}`}
          alt={bufo.id}
          className="w-full h-full object-contain rounded opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </button>
      <span className="text-[10px] sm:text-xs text-gray-500 truncate w-full text-center group-hover:text-bufo-500 transition-colors">
        {bufo.id}
      </span>
    </div>
  );
}
