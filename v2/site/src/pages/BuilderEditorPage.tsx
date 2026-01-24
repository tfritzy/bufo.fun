import { useParams, Link } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  getTemplateById,
  TemplateLayer,
  LayerPosition,
} from "../builderTemplates";

interface LayerState extends TemplateLayer {
  imageData: string | null;
}

export function BuilderEditorPage() {
  const { id } = useParams<{ id: string }>();
  const template = id ? getTemplateById(id) : undefined;

  const [layers, setLayers] = useState<LayerState[]>([]);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const exportCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (template) {
      const initialLayers: LayerState[] = template.layers.map((layer) => ({
        ...layer,
        imageData: null,
      }));
      setLayers(initialLayers);
      setActiveLayerIndex(template.activeLayerIndex);
    }
  }, [template]);

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageData = event.target?.result as string;
              setLayers((prev) =>
                prev.map((layer, idx) =>
                  idx === activeLayerIndex ? { ...layer, imageData } : layer
                )
              );
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    },
    [activeLayerIndex]
  );

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      setLayers((prev) =>
        prev.map((layer, idx) =>
          idx === activeLayerIndex ? { ...layer, imageData } : layer
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const updateLayerPosition = (
    index: number,
    updates: Partial<LayerPosition>
  ) => {
    setLayers((prev) =>
      prev.map((layer, idx) =>
        idx === index
          ? { ...layer, position: { ...layer.position, ...updates } }
          : layer
      )
    );
  };

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    if (layers[index].locked) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setActiveLayerIndex(index);
    setIsDragging(true);
    setDragStart({
      x: e.clientX - layers[index].position.x,
      y: e.clientY - layers[index].position.y,
    });
  };

  const handleResizeStart = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (layers[index].locked) return;

    setActiveLayerIndex(index);
    setIsResizing(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && !isResizing) return;

    const layer = layers[activeLayerIndex];
    if (!layer || layer.locked) return;

    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      updateLayerPosition(activeLayerIndex, { x: newX, y: newY });
    } else if (isResizing) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      const delta = Math.max(deltaX, deltaY);
      const newSize = Math.max(50, layer.position.width + delta);
      updateLayerPosition(activeLayerIndex, { width: newSize, height: newSize });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleDownload = async () => {
    const canvas = exportCanvasRef.current;
    if (!canvas || !template) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = template.canvasWidth;
    canvas.height = template.canvasHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const layer of layers) {
      if (!layer.visible) continue;

      const imgSrc = layer.imageData || layer.file;
      if (!imgSrc) continue;

      await new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          ctx.drawImage(
            img,
            layer.position.x,
            layer.position.y,
            layer.position.width,
            layer.position.height
          );
          resolve();
        };
        img.onerror = () => resolve();
        img.src = imgSrc;
      });
    }

    const link = document.createElement("a");
    link.download = `custom-${template.id}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Template not found
        </h1>
        <Link to="/builder" className="text-bufo-500 hover:underline">
          Back to templates
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-80px)]">
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <Link
            to="/builder"
            className="flex items-center text-gray-600 hover:text-bufo-500 mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to templates
          </Link>
          <h2 className="text-xl font-bold text-gray-800">{template.name}</h2>
          <p className="text-sm text-gray-500 mt-1">{template.description}</p>
        </div>

        <div className="p-4 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Upload Image
          </h3>
          <label className="block w-full cursor-pointer">
            <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-bufo-400 hover:bg-bufo-50 transition-colors">
              <div className="text-center">
                <svg
                  className="mx-auto h-8 w-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-1 text-sm text-gray-600">
                  Click to upload or paste
                </p>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        <div className="p-4 flex-grow">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Layers
          </h3>
          <div className="space-y-2">
            {[...layers].reverse().map((layer, reversedIdx) => {
              const idx = layers.length - 1 - reversedIdx;
              return (
                <div
                  key={layer.id}
                  onClick={() => !layer.locked && setActiveLayerIndex(idx)}
                  className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                    idx === activeLayerIndex
                      ? "bg-bufo-100 border border-bufo-400"
                      : "bg-gray-50 border border-transparent hover:bg-gray-100"
                  } ${layer.locked ? "opacity-60" : ""}`}
                >
                  <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center mr-3 overflow-hidden">
                    {layer.imageData ? (
                      <img
                        src={layer.imageData}
                        alt={layer.name}
                        className="w-full h-full object-cover"
                      />
                    ) : layer.file ? (
                      <img
                        src={layer.file}
                        alt={layer.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium flex-grow">
                    {layer.name}
                  </span>
                  {layer.locked && (
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleDownload}
            className="w-full py-3 px-4 bg-bufo-500 text-white rounded-lg font-medium hover:bg-bufo-600 transition-colors flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Download
          </button>
        </div>
      </aside>

      <main className="flex-grow bg-gray-200 flex items-center justify-center overflow-hidden">
        <div
          ref={canvasRef}
          className="relative bg-white shadow-xl rounded-lg overflow-hidden"
          style={{
            width: template.canvasWidth,
            height: template.canvasHeight,
            backgroundImage:
              "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {layers.map((layer, idx) => {
            if (!layer.visible) return null;

            const imgSrc = layer.imageData || layer.file;
            const isActive = idx === activeLayerIndex && !layer.locked;

            return (
              <div
                key={layer.id}
                className={`absolute ${
                  layer.locked ? "" : "cursor-move"
                } ${isActive ? "ring-2 ring-bufo-500 ring-offset-2" : ""}`}
                style={{
                  left: layer.position.x,
                  top: layer.position.y,
                  width: layer.position.width,
                  height: layer.position.height,
                  zIndex: idx,
                }}
                onMouseDown={(e) => handleMouseDown(e, idx)}
              >
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={layer.name}
                    className="w-full h-full object-contain pointer-events-none"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-white bg-opacity-50">
                    <span className="text-gray-400 text-sm text-center px-2">
                      Paste or upload an image
                    </span>
                  </div>
                )}
                {isActive && (
                  <div
                    className="absolute bottom-0 right-0 w-4 h-4 bg-bufo-500 cursor-se-resize rounded-tl"
                    onMouseDown={(e) => handleResizeStart(e, idx)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <canvas ref={exportCanvasRef} className="hidden" />
      </main>
    </div>
  );
}
