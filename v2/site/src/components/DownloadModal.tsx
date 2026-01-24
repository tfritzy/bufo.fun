import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Bufo } from "../types";
import { Modal } from "./Modal";
import { CaseStyle, convertCase } from "../utils";

interface DownloadModalProps {
  bufos: Bufo[];
  isOpen: boolean;
  onClose: () => void;
}

const CASE_OPTIONS: { value: CaseStyle; label: string; example: string }[] = [
  { value: "original", label: "Original", example: "bufo-happy" },
  { value: "kebab-case", label: "kebab-case", example: "bufo-happy" },
  { value: "camelCase", label: "camelCase", example: "bufoHappy" },
  { value: "TitleCase", label: "TitleCase", example: "BufoHappy" },
  { value: "snake_case", label: "snake_case", example: "bufo_happy" },
];

export function DownloadModal({ bufos, isOpen, onClose }: DownloadModalProps) {
  const [caseStyle, setCaseStyle] = useState<CaseStyle>("original");
  const [isDownloading, setIsDownloading] = useState(false);

  const getConvertedFilename = (bufo: Bufo): string => {
    const nameWithoutExt = bufo.id;
    const ext = bufo.fileType;
    const convertedName = convertCase(nameWithoutExt, caseStyle);
    return `${convertedName}.${ext}`;
  };

  const handleDownload = async () => {
    if (bufos.length === 0) return;

    setIsDownloading(true);

    try {
      if (bufos.length === 1) {
        const bufo = bufos[0];
        const response = await fetch(`/bufos/${bufo.filename}`);
        const blob = await response.blob();
        const filename = getConvertedFilename(bufo);
        saveAs(blob, filename);
      } else {
        const zip = new JSZip();

        await Promise.all(
          bufos.map(async (bufo) => {
            const response = await fetch(`/bufos/${bufo.filename}`);
            const blob = await response.blob();
            const filename = getConvertedFilename(bufo);
            zip.file(filename, blob);
          })
        );

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "bufos.zip");
      }
      onClose();
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const exampleBufo = bufos[0];
  const exampleFilename = exampleBufo ? getConvertedFilename(exampleBufo) : "";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 text-sm flex flex-col space-y-4 min-w-80">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-semibold text-lg">Download Bufos</h2>
          <button onClick={onClose}>
            <svg
              width="24px"
              height="24px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-gray-700"
            >
              <path
                d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="bg-bufo-50 rounded-lg p-3 flex items-center space-x-3">
          <div className="bg-bufo-500 rounded-full p-2">
            <svg
              className="w-6 h-6 text-white"
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
          </div>
          <div>
            <div className="font-semibold text-bufo-700">
              {bufos.length} {bufos.length === 1 ? "bufo" : "bufos"} selected
            </div>
            <div className="text-bufo-600 text-xs">
              {bufos.length === 1 ? "Single file download" : "Will be downloaded as ZIP"}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filename Style
          </label>
          <div className="space-y-2">
            {CASE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center cursor-pointer group"
                onClick={() => setCaseStyle(option.value)}
              >
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 group-hover:border-bufo-400 transition-colors">
                  {caseStyle === option.value && (
                    <div className="w-3 h-3 rounded-full bg-bufo-500" />
                  )}
                </div>
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {exampleBufo && (
            <div className="mt-3 text-xs text-gray-500">
              Preview: <span className="font-mono bg-gray-100 px-1 rounded">{exampleFilename}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleDownload}
          disabled={isDownloading || bufos.length === 0}
          className="w-full bg-bufo-400 text-white rounded-md px-4 py-2 font-medium border border-bufo-500 focus:outline-none focus:ring-2 focus:ring-bufo-200 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isDownloading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Downloading...</span>
            </>
          ) : (
            <>
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span>Download {bufos.length === 1 ? "Bufo" : `${bufos.length} Bufos`}</span>
            </>
          )}
        </button>
      </div>
    </Modal>
  );
}
