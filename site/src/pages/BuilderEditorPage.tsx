import { useParams, Link } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  getTemplateById,
  TemplateLayer,
  LayerPosition,
} from "../builderTemplates";
import { SEO } from "../components/SEO";
import { BuilderSidebar } from "../components/BuilderSidebar";

interface LayerState extends TemplateLayer {
  imageData: string | null;
}

type ResizeDirection = 'nw' | 'ne' | 'se' | 'sw' | '';

interface PointerPosition {
  clientX: number;
  clientY: number;
}

export function BuilderEditorPage() {
  const { id } = useParams<{ id: string }>();
  const template = id ? getTemplateById(id) : undefined;

  const [layers, setLayers] = useState<LayerState[]>([]);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection>("");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [bufoName, setBufoName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState<number>(500);
  const [canvasHeight, setCanvasHeight] = useState<number>(500);
  const [widthInput, setWidthInput] = useState<string>("500");
  const [heightInput, setHeightInput] = useState<string>("500");
  const displayScale = 3;
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
      setCanvasWidth(template.canvasWidth);
      setCanvasHeight(template.canvasHeight);
      setWidthInput(String(template.canvasWidth));
      setHeightInput(String(template.canvasHeight));
    }
  }, [template]);

  const layerHasNoPosition = (layer: LayerState): boolean =>
    layer.position.width === 0 && layer.position.height === 0;

  const loadImageWithPosition = useCallback(
    (imageData: string, layerIndex: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLayers((prev) =>
            prev.map((layer, idx) => {
              if (idx !== layerIndex) return layer;
              if (layerHasNoPosition(layer)) {
                return {
                  ...layer,
                  imageData,
                  position: {
                    x: canvasWidth / 4,
                    y: canvasHeight / 4,
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                  },
                };
              }
              return { ...layer, imageData };
            })
          );
          resolve();
        };
        img.onerror = () => {
          setLayers((prev) =>
            prev.map((layer, idx) =>
              idx === layerIndex ? { ...layer, imageData } : layer
            )
          );
          resolve();
        };
        img.src = imageData;
      });
    },
    [canvasWidth, canvasHeight]
  );

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
              loadImageWithPosition(imageData, activeLayerIndex);
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    },
    [activeLayerIndex, loadImageWithPosition]
  );

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetLayerIndex?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const layerIndex = targetLayerIndex !== undefined ? targetLayerIndex : activeLayerIndex;
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      loadImageWithPosition(imageData, layerIndex);
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

  const clearLayerImage = (index: number) => {
    setLayers((prev) =>
      prev.map((layer, idx) =>
        idx === index ? { ...layer, imageData: null } : layer
      )
    );
  };

  const isUserEditableLayer = (layer: LayerState) => !layer.file;

  const handleMouseDown = (e: React.MouseEvent) => {
    const layer = layers[activeLayerIndex];
    if (!layer) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX / displayScale - layer.position.x,
      y: e.clientY / displayScale - layer.position.y,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const layer = layers[activeLayerIndex];
    if (!layer) return;

    const touch = e.touches[0];
    if (!touch) return;

    setIsDragging(true);
    setDragStart({
      x: touch.clientX / displayScale - layer.position.x,
      y: touch.clientY / displayScale - layer.position.y,
    });
  };

  const createTouchToMouseHandler = (handler: (e: PointerPosition) => void) => {
    return (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) {
        handler({ clientX: touch.clientX, clientY: touch.clientY });
      }
    };
  };

  const handleResizeStart = (e: React.MouseEvent | PointerPosition, direction: ResizeDirection) => {
    if ('stopPropagation' in e) {
      e.stopPropagation();
    }
    const layer = layers[activeLayerIndex];
    if (!layer) return;

    setIsResizing(true);
    setResizeDirection(direction);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialSize({
      width: layer.position.width,
      height: layer.position.height,
    });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging && !isResizing) return;

    const layer = layers[activeLayerIndex];
    if (!layer) return;

    if (isDragging) {
      const newX = clientX / displayScale - dragStart.x;
      const newY = clientY / displayScale - dragStart.y;
      updateLayerPosition(activeLayerIndex, { x: newX, y: newY });
    } else if (isResizing) {
      const deltaX = (clientX - dragStart.x) / displayScale;
      const deltaY = (clientY - dragStart.y) / displayScale;
      
      let updates: Partial<LayerPosition> = {};

      switch (resizeDirection) {
        case 'se':
          const seDelta = Math.max(deltaX, deltaY);
          updates = {
            width: Math.max(10, initialSize.width + seDelta),
            height: Math.max(10, initialSize.height + seDelta),
          };
          break;
        case 'nw':
          const nwDelta = Math.max(-deltaX, -deltaY);
          const nwNewSize = Math.max(10, initialSize.width + nwDelta);
          updates = {
            x: layer.position.x - (nwNewSize - layer.position.width),
            y: layer.position.y - (nwNewSize - layer.position.height),
            width: nwNewSize,
            height: nwNewSize,
          };
          break;
        case 'ne':
          const neDelta = Math.max(deltaX, -deltaY);
          const neNewSize = Math.max(10, initialSize.width + neDelta);
          updates = {
            y: layer.position.y - (neNewSize - layer.position.height),
            width: neNewSize,
            height: neNewSize,
          };
          break;
        case 'sw':
          const swDelta = Math.max(-deltaX, deltaY);
          const swNewSize = Math.max(10, initialSize.width + swDelta);
          updates = {
            x: layer.position.x - (swNewSize - layer.position.width),
            width: swNewSize,
            height: swNewSize,
          };
          break;
      }

      updateLayerPosition(activeLayerIndex, updates);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection("");
  };

  const handleWidthBlur = () => {
    const value = parseInt(widthInput, 10);
    const validated = isNaN(value) ? 100 : Math.max(100, Math.min(2000, value));
    setCanvasWidth(validated);
    setWidthInput(String(validated));
  };

  const handleHeightBlur = () => {
    const value = parseInt(heightInput, 10);
    const validated = isNaN(value) ? 100 : Math.max(100, Math.min(2000, value));
    setCanvasHeight(validated);
    setHeightInput(String(validated));
  };

  const handleDownloadClick = () => {
    openDownloadModal();
  };

  const generatePreview = async (): Promise<string | null> => {
    const canvas = exportCanvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
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

    return canvas.toDataURL("image/png");
  };

  const openDownloadModal = async () => {
    const preview = await generatePreview();
    setPreviewUrl(preview);
    setBufoName(`${template?.id || "bufo"}-`);
    setShowDownloadModal(true);
  };

  const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    triggerDownload(previewUrl, `${bufoName || "bufo"}.png`);
  };

  const handleCopyToClipboard = async () => {
    if (!previewUrl) return;
    try {
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      triggerDownload(previewUrl, `${bufoName || "bufo"}.png`);
    }
  };

  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow px-4">
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
    <>
      <SEO
        title={`${template.name} - Create Custom Bufo`}
        description={`Use the ${template.name} template to create your own custom bufo emoji. Design, customize, and export your perfect bufo.`}
        keywords="bufo, builder, create, custom, emoji, design, editor"
        url={`https://bufo.fun/builder/${id}`}
      />
      <div className="flex flex-grow h-full relative">
        <BuilderSidebar
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          widthInput={widthInput}
          heightInput={heightInput}
          onWidthChange={setWidthInput}
          onHeightChange={setHeightInput}
          onWidthBlur={handleWidthBlur}
          onHeightBlur={handleHeightBlur}
          layers={layers}
          activeLayerIndex={activeLayerIndex}
          onLayerClick={setActiveLayerIndex}
          onFileUpload={handleFileUpload}
          onClearLayerImage={clearLayerImage}
          isUserEditableLayer={isUserEditableLayer}
          onDownload={handleDownloadClick}
        />

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex gap-3" role="group" aria-label="Layer selection and actions">
          {layers.map((layer, idx) => {
            const imgSrc = layer.imageData || layer.file;
            const isActive = idx === activeLayerIndex;
            
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayerIndex(idx)}
                className={`w-14 h-14 rounded-lg shadow-lg flex items-center justify-center transition-all relative ${
                  isActive
                    ? "bg-bufo-200 ring-2 ring-bufo-300"
                    : "bg-white hover:bg-gray-50"
                }`}
                aria-label={layer.name}
                aria-pressed={isActive}
              >
                <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={layer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className={`w-6 h-6 ${isActive ? "text-bufo-600" : "text-gray-400"}`}
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
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                    <svg
                      className="w-3 h-3 text-bufo-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
          <button
            onClick={handleDownloadClick}
            className="w-14 h-14 rounded-lg shadow-lg bg-bufo-500 hover:bg-bufo-600 text-white flex items-center justify-center transition-all"
            aria-label="Download"
          >
            <svg
              className="w-6 h-6"
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
          </button>
        </div>

        <main className="flex-grow bg-gray-200 flex items-center justify-center overflow-auto p-4">
          <div
            ref={canvasRef}
            className="relative bg-white shadow-xl overflow-hidden"
            style={{
              width: canvasWidth,
              height: canvasHeight,
              transform: `scale(${displayScale})`,
              transformOrigin: "center center",
              imageRendering: "pixelated",
              backgroundImage:
                "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
              backgroundSize: "8px 8px",
              backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
            }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {layers.map((layer, idx) => {
            if (!layer.visible) return null;

            const imgSrc = layer.imageData || layer.file;
            if (!imgSrc) return null;

            const isActive = idx === activeLayerIndex;

            return (
              <div
                key={layer.id}
                className={`absolute cursor-move ${isActive ? "ring-1 ring-bufo-500" : ""}`}
                style={{
                  left: layer.position.x,
                  top: layer.position.y,
                  width: layer.position.width,
                  height: layer.position.height,
                  zIndex: idx,
                  pointerEvents: isActive ? "auto" : "none",
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                <img
                  src={imgSrc}
                  alt={layer.name}
                  className="w-full h-full object-contain pointer-events-none select-none"
                  style={{ imageRendering: "pixelated" }}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                />
                {isActive && (
                  <>
                    <div
                      className="absolute top-0 left-0 cursor-nw-resize -translate-x-1/2 -translate-y-1/2 flex items-center justify-center touch-none"
                      style={{ width: 24, height: 24 }}
                      onMouseDown={(e) => handleResizeStart(e, 'nw')}
                      onTouchStart={createTouchToMouseHandler((e) => handleResizeStart(e, 'nw'))}
                    >
                      <div className="bg-white border-2 border-bufo-500 rounded-sm" style={{ width: 8, height: 8 }} />
                    </div>
                    <div
                      className="absolute top-0 right-0 cursor-ne-resize translate-x-1/2 -translate-y-1/2 flex items-center justify-center touch-none"
                      style={{ width: 24, height: 24 }}
                      onMouseDown={(e) => handleResizeStart(e, 'ne')}
                      onTouchStart={createTouchToMouseHandler((e) => handleResizeStart(e, 'ne'))}
                    >
                      <div className="bg-white border-2 border-bufo-500 rounded-sm" style={{ width: 8, height: 8 }} />
                    </div>
                    <div
                      className="absolute bottom-0 right-0 cursor-se-resize translate-x-1/2 translate-y-1/2 flex items-center justify-center touch-none"
                      style={{ width: 24, height: 24 }}
                      onMouseDown={(e) => handleResizeStart(e, 'se')}
                      onTouchStart={createTouchToMouseHandler((e) => handleResizeStart(e, 'se'))}
                    >
                      <div className="bg-white border-2 border-bufo-500 rounded-sm" style={{ width: 8, height: 8 }} />
                    </div>
                    <div
                      className="absolute bottom-0 left-0 cursor-sw-resize -translate-x-1/2 translate-y-1/2 flex items-center justify-center touch-none"
                      style={{ width: 24, height: 24 }}
                      onMouseDown={(e) => handleResizeStart(e, 'sw')}
                      onTouchStart={createTouchToMouseHandler((e) => handleResizeStart(e, 'sw'))}
                    >
                      <div className="bg-white border-2 border-bufo-500 rounded-sm" style={{ width: 8, height: 8 }} />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <canvas ref={exportCanvasRef} className="hidden" />
      </main>
      </div>

      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Save Your Bufo</h2>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              {previewUrl && (
                <div className="mb-4 bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full max-h-48 object-contain"
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bufo Name
                </label>
                <input
                  type="text"
                  value={bufoName}
                  onChange={(e) => setBufoName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bufo-500 focus:border-bufo-500 outline-none"
                  placeholder="bufo-custom"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-2 px-4 bg-bufo-500 text-white rounded-lg font-medium hover:bg-bufo-600 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
                <button
                  onClick={handleCopyToClipboard}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
                    copied
                      ? "bg-bufo-100 text-bufo-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
