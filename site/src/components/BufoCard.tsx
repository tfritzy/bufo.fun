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
    <div className="w-[64px] min-w-[64px] m-2">
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="focus:outline-none focus:ring-2 focus:ring-bufo-300 rounded transition-shadow"
      >
        <div className="rounded w-[64px] min-w-[64px] h-[64px] min-h-[64px] border border-bufo-400 bg-bufo-50">
          <img
            src={`/smolBufos/${bufo.filename}`}
            alt={bufo.id}
            title={bufo.id}
            className="w-full h-full"
          />
        </div>
      </button>
      <span className="block text-center text-[10px] text-bufo-500 whitespace-nowrap overflow-x-clip">
        {bufo.id}
      </span>
    </div>
  );
}
