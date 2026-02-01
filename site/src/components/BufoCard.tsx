import { useState } from "react";
import { Bufo } from "../types";
import { downloadBufo } from "../utils";

interface BufoCardProps {
  bufo: Bufo;
  onClick: () => void;
  preload?: boolean;
}

export function BufoCard({ bufo, onClick, preload = false }: BufoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

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
        <div className="rounded w-[64px] min-w-[64px] h-[64px] min-h-[64px] border border-bufo-400 bg-bufo-50 relative">
          <img
            src={`/smolBufos/${bufo.filename}`}
            alt={bufo.id}
            title={bufo.id}
            className={`w-full h-full transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading={preload ? "eager" : "lazy"}
          />
        </div>
      </button>
    </div>
  );
}
