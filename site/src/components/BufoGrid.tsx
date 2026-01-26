import { useState } from "react";
import { Bufo } from "../types";
import { BufoCard } from "./BufoCard";
import { BufoModal } from "./BufoModal";
import { DownloadModal } from "./DownloadModal";
import { Button } from "./Button";

interface BufoGridProps {
  bufos: Bufo[];
  onTagClick?: (tag: string) => void;
}

export function BufoGrid({ bufos, onTagClick }: BufoGridProps) {
  const [selectedBufo, setSelectedBufo] = useState<Bufo | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const handleTagClick = (tag: string) => {
    if (onTagClick) {
      onTagClick(tag);
    }
    setSelectedBufo(null);
  };

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,80px)]">
        <div className="col-span-full ml-2 mr-2 mb-1 text-sm text-bufo-500 flex flex-row space-x-1 items-center justify-between">
          <span>
            <span className="font-semibold">{bufos.length}</span> bufos
          </span>
          <Button
            onClick={() => setShowDownloadModal(true)}
            disabled={bufos.length === 0}
            className="px-3 py-1 text-sm flex items-center space-x-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Download all</span>
          </Button>
        </div>
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
      <DownloadModal
        bufos={bufos}
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </>
  );
}
