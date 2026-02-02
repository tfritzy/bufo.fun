import { useState } from "react";
import { Bufo } from "../types";
import { Modal } from "./Modal";
import { Tag } from "./Tag";
import { Button } from "./Button";
import { downloadBufo, copyBufoToClipboard, isGif } from "../utils";
import { proverbs } from "../proverbs";

interface BufoModalProps {
  bufo: Bufo | null;
  isOpen: boolean;
  onClose: () => void;
  onTagClick?: (tag: string) => void;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function BufoModal({ bufo, isOpen, onClose, onTagClick }: BufoModalProps) {
  const [copied, setCopied] = useState(false);

  if (!bufo) {
    return (
      <Modal isOpen={false} onClose={onClose}>
        <div />
      </Modal>
    );
  }

  const handleCopy = async () => {
    if (isGif(bufo)) return;
    const success = await copyBufoToClipboard(bufo);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncatedName =
    bufo.id.length > 30 ? bufo.id.substring(0, 30) + "..." : bufo.id;

  const proverb = proverbs[hashString(bufo.id) % proverbs.length];
  const updootCount = (hashString(bufo.id) % 10) + 1;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-3 text-sm flex flex-col space-y-3">
        <div className="font-semibold text-md w-full flex flex-row justify-between">
          <div className="flex-grow truncate">{bufo.id}</div>
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

        {/* Full size bufo */}
        <div className="flex justify-center items-center h-[160px] bg-gradient-to-b from-bufo-50 to-white rounded-lg">
          <img
            src={`/bufos/${bufo.filename}`}
            alt={bufo.id}
            className="max-w-[128px] max-h-[128px] object-contain"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* Message preview */}
        <div className="flex flex-row space-x-2 bg-gray-50 shadow-sm p-2 border border-gray-200 min-w-80">
          <img
            src={`/smolBufos/${bufo.filename}`}
            alt={bufo.id}
            className="w-[36px] h-[36px] min-w-[36px] min-h-[36px]"
          />
          <div className="flex flex-col space-y-1">
            <div className="flex flex-row space-x-1 items-end">
              <span className="font-bold text-xs">{truncatedName}</span>
              <span className="text-gray-600 text-xs">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </div>
            <div className="whitespace-normal">
              {proverb}{" "}
              <img
                src={`/smolBufos/${bufo.filename}`}
                alt={bufo.id}
                className="w-[18px] h-[18px] align-middle mr-10 inline"
              />
            </div>
            <div className="rounded-full bg-gray-100 flex flex-row items-center space-x-1 w-min px-[6px] py-[2px]">
              <img
                src={`/smolBufos/${bufo.filename}`}
                alt={bufo.id}
                className="min-w-[16px] min-h-[16px]"
              />
              <span className="text-sm">{updootCount}</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="text-sm">
          <div className="font-semibold mb-1">Details</div>
          <table>
            <tbody>
              <tr>
                <td className="text-gray-700 min-w-20">Name</td>
                <td className="font-mono">:{bufo.id}:</td>
              </tr>
              <tr>
                <td className="text-gray-700">Tags</td>
                <td>
                  {bufo.tags.length > 0 ? (
                    <div className="flex flex-row flex-wrap">
                      {bufo.tags.map((tag) => (
                        <div key={tag} className="m-1">
                          <Tag name={tag} onClick={onTagClick ? () => onTagClick(tag) : undefined} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span>&mdash;</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="flex flex-row justify-end space-x-2">
          <button
            className={`rounded px-2 py-1 mt-2 border transition-all duration-150 ease-in-out ${
              isGif(bufo)
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-gray-700 border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:shadow-sm"
            }`}
            onClick={handleCopy}
            disabled={isGif(bufo)}
            title={isGif(bufo) ? "GIFs cannot be copied to clipboard" : undefined}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <Button
            className="px-2 mt-2"
            onClick={() => downloadBufo(bufo)}
          >
            Download
          </Button>
        </div>
      </div>
    </Modal>
  );
}
