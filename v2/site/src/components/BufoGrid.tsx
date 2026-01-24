import { useState } from "react";
import { Bufo } from "../types";
import { BufoCard } from "./BufoCard";
import { BufoModal } from "./BufoModal";

interface BufoGridProps {
  bufos: Bufo[];
}

export function BufoGrid({ bufos }: BufoGridProps) {
  const [selectedBufo, setSelectedBufo] = useState<Bufo | null>(null);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 pt-2">
        <span className="font-bold text-bufo-500">{bufos.length}</span>
        <span className="text-gray-600">bufos</span>
        <svg
          className="w-4 h-4 text-gray-400 cursor-pointer hover:text-bufo-500 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-x-2 gap-y-6 pt-4">
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
    </div>
  );
}
