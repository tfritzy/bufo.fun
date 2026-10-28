import { useEffect, useState } from "react";
import { useBufos } from "../BufoContext";
import { useSearch } from "../useSearch";
import { accessories, accessoryCategories } from "../accessories";

const MAX_RESULTS = 240;

type Tab = "bufos" | "accessories" | "upload";

interface AddLayerModalProps {
  onClose: () => void;
  onAddImage: (src: string, name: string, fillCanvas?: boolean) => void;
  onUploadFiles: (files: FileList | File[]) => void;
}

export function AddLayerModal({
  onClose,
  onAddImage,
  onUploadFiles,
}: AddLayerModalProps) {
  const [tab, setTab] = useState<Tab>("bufos");
  const { bufos, loading } = useBufos();
  const { searchTerm, setSearchTerm, filteredBufos } = useSearch(bufos);
  const shownBufos = filteredBufos.slice(0, MAX_RESULTS);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const tabClass = (t: Tab) =>
    `flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
      tab === t
        ? "border-bufo-500 text-bufo-600"
        : "border-transparent text-gray-500 hover:text-gray-700"
    }`;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Add layer"
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Add Layer</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex border-b border-gray-200" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "bufos"}
            className={tabClass("bufos")}
            onClick={() => setTab("bufos")}
          >
            Bufos
          </button>
          <button
            role="tab"
            aria-selected={tab === "accessories"}
            className={tabClass("accessories")}
            onClick={() => setTab("accessories")}
          >
            Accessories
          </button>
          <button
            role="tab"
            aria-selected={tab === "upload"}
            className={tabClass("upload")}
            onClick={() => setTab("upload")}
          >
            Upload
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-grow">
          {tab === "bufos" && (
            <>
              <input
                type="text"
                autoFocus
                placeholder="Search bufos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-3 px-3 py-2 rounded-md border border-gray-200 focus:border-bufo-200 focus:outline-none focus:ring-2 focus:ring-bufo-200"
              />
              {loading ? (
                <p className="text-sm text-gray-500">Loading bufos...</p>
              ) : (
                <>
                  <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                    {shownBufos.map((bufo) => (
                      <button
                        key={bufo.id}
                        onClick={() => onAddImage(`/bufos/${bufo.filename}`, bufo.id, true)}
                        title={bufo.id}
                        className="aspect-square rounded border border-bufo-200 bg-bufo-50 hover:border-bufo-500 hover:ring-2 hover:ring-bufo-200 transition-all overflow-hidden"
                      >
                        <img
                          src={`/smolBufos/${bufo.filename}`}
                          alt={bufo.id}
                          loading="lazy"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `/bufos/${bufo.filename}`;
                          }}
                        />
                      </button>
                    ))}
                  </div>
                  {filteredBufos.length > shownBufos.length && (
                    <p className="text-xs text-gray-400 mt-3 text-center">
                      Showing {shownBufos.length} of {filteredBufos.length}. Search
                      to find more.
                    </p>
                  )}
                  {filteredBufos.length === 0 && (
                    <p className="text-sm text-gray-500">No bufos match.</p>
                  )}
                </>
              )}
            </>
          )}

          {tab === "accessories" &&
            accessoryCategories.map((category) => (
              <section key={category} className="mb-4 last:mb-0">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {category}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {accessories
                    .filter((accessory) => accessory.category === category)
                    .map((accessory) => (
                      <button
                        key={accessory.id}
                        onClick={() => onAddImage(accessory.file, accessory.name)}
                        className="flex flex-col items-center p-2 rounded-lg border border-gray-200 hover:border-bufo-500 hover:bg-bufo-50 transition-colors"
                      >
                        <div className="w-full aspect-square flex items-center justify-center">
                          <img
                            src={accessory.file}
                            alt={accessory.name}
                            className="max-w-full max-h-full object-contain"
                            style={{ imageRendering: "pixelated" }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 mt-1 text-center">
                          {accessory.name}
                        </span>
                      </button>
                    ))}
                </div>
              </section>
            ))}

          {tab === "upload" && (
            <label className="flex flex-col items-center justify-center h-48 rounded-lg border-2 border-dashed border-gray-300 hover:border-bufo-400 hover:bg-bufo-50 cursor-pointer transition-colors">
              <svg
                className="w-8 h-8 text-bufo-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-sm font-medium text-bufo-600">
                Choose images
              </span>
              <span className="text-xs text-gray-400 mt-1">
                You can also paste (Ctrl+V) or drop images on the canvas
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files?.length) onUploadFiles(e.target.files);
                }}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
