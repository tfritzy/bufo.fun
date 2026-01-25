import { useState } from "react";
import { Bufo } from "../types";
import { BufoCard } from "./BufoCard";
import { BufoModal } from "./BufoModal";

interface BufoGridProps {
  bufos: Bufo[];
  onTagClick?: (tag: string) => void;
}

export function BufoGrid({ bufos, onTagClick }: BufoGridProps) {
  const [selectedBufo, setSelectedBufo] = useState<Bufo | null>(null);

  const handleTagClick = (tag: string) => {
    if (onTagClick) {
      onTagClick(tag);
    }
    setSelectedBufo(null);
  };

  return (
    <div className="w-full">
      <div className="ml-2 text-sm text-bufo-500 flex flex-row space-x-1 items-center">
        <span>
          <span className="font-semibold">{bufos.length}</span> bufos
        </span>
      </div>
      <div className="flex flex-row flex-wrap">
        {bufos.map((bufo) => (
          <BufoCard
            key={bufo.id}
            bufo={bufo}
            onClick={() => setSelectedBufo(bufo)}
          />
        ))}
      </div>
      <BufoModal
        bufo={selectedBufo}
        isOpen={selectedBufo !== null}
        onClose={() => setSelectedBufo(null)}
        onTagClick={handleTagClick}
      />
    </div>
  );
}
