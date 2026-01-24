import { useState } from "react";
import { Bufo } from "../types";
import { BufoCard } from "./BufoCard";
import { BufoModal } from "./BufoModal";
import { DownloadModal } from "./DownloadModal";

interface BufoGridProps {
  bufos: Bufo[];
}

export function BufoGrid({ bufos }: BufoGridProps) {
  const [selectedBufo, setSelectedBufo] = useState<Bufo | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  return (
    <div className="w-full">
      <div className="ml-2 text-sm text-bufo-500 flex flex-row space-x-1 items-center justify-between">
        <span>
          <span className="font-semibold">{bufos.length}</span> bufos
        </span>
        <button
          onClick={() => setShowDownloadModal(true)}
          disabled={bufos.length === 0}
          className="mr-2 px-3 py-1 bg-bufo-400 text-white text-sm rounded-md border border-bufo-500 hover:bg-bufo-500 focus:outline-none focus:ring-2 focus:ring-bufo-200 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
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
          <span>Download All</span>
        </button>
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
      />
      <DownloadModal
        bufos={bufos}
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </div>
  );
}
