import { useParams, Link } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  getTemplateById,
  TemplateLayer,
  LayerPosition,
} from "../builderTemplates";
import { SEO } from "../components/SEO";

interface LayerState extends TemplateLayer {
  imageData: string | null;
}

type ResizeDirection = 'nw' | 'ne' | 'se' | 'sw' | '';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const createTouchToMouseHandler = (handler: (e: React.MouseEvent) => void) => {
    return (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) {
        const mouseEvent = new MouseEvent('mousedown', {
          clientX: touch.clientX,
          clientY: touch.clientY,
          bubbles: true
        }) as unknown as React.MouseEvent;
        handler(mouseEvent);
      }
    };
  };

  const handleResizeStart = (e: React.MouseEvent, direction: ResizeDirection) => {
    e.stopPropagation();
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && !isResizing) return;

    const layer = layers[activeLayerIndex];
    if (!layer) return;

    if (isDragging) {
      const newX = e.clientX / displayScale - dragStart.x;
      const newY = e.clientY / displayScale - dragStart.y;
      updateLayerPosition(activeLayerIndex, { x: newX, y: newY });
    } else if (isResizing) {
      const deltaX = (e.clientX - dragStart.x) / displayScale;
      const deltaY = (e.clientY - dragStart.y) / displayScale;
      
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

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging && !isResizing) return;

    const layer = layers[activeLayerIndex];
    if (!layer) return;

    const touch = e.touches[0];
    if (!touch) return;

    if (isDragging) {
      const newX = touch.clientX / displayScale - dragStart.x;
      const newY = touch.clientY / displayScale - dragStart.y;
      updateLayerPosition(activeLayerIndex, { x: newX, y: newY });
    } else if (isResizing) {
      const deltaX = (touch.clientX - dragStart.x) / displayScale;
      const deltaY = (touch.clientY - dragStart.y) / displayScale;
      
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

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection("");
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
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed bottom-4 left-4 z-50 md:hidden bg-bufo-500 text-white p-3 rounded-full shadow-lg hover:bg-bufo-600 transition-colors"
            aria-label="Open sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <aside className={`
          fixed md:relative inset-y-0 left-0 z-40
          w-72 bg-white border-r border-gray-200 
          flex flex-col overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Builder</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4 flex-grow">
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Canvas Size
              </h3>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">Width (px)</label>
                  <input
                    type="number"
                    min="100"
                    max="2000"
                    value={widthInput}
                    onChange={(e) => setWidthInput(e.target.value)}
                    onBlur={() => {
                      const value = parseInt(widthInput, 10);
                      const validated = isNaN(value) ? 100 : Math.max(100, Math.min(2000, value));
                      setCanvasWidth(validated);
                      setWidthInput(String(validated));
                    }}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-bufo-300 outline-none transition-shadow"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">Height (px)</label>
                  <input
                    type="number"
                    min="100"
                    max="2000"
                    value={heightInput}
                    onChange={(e) => setHeightInput(e.target.value)}
                    onBlur={() => {
                      const value = parseInt(heightInput, 10);
                      const validated = isNaN(value) ? 100 : Math.max(100, Math.min(2000, value));
                      setCanvasHeight(validated);
                      setHeightInput(String(validated));
                    }}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-bufo-300 outline-none transition-shadow"
                  />
                </div>
              </div>
            </div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Layers
            </h3>
            <div className="space-y-2">
              {[...layers].reverse().map((layer, reversedIdx) => {
                const idx = layers.length - 1 - reversedIdx;
                const isEditable = isUserEditableLayer(layer);
                const isEmptyEditableLayer = isEditable && !layer.imageData;

                if (isEmptyEditableLayer) {
                  return (
                    <label
                      key={layer.id}
                      onClick={() => setActiveLayerIndex(idx)}
                      className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                        idx === activeLayerIndex
                          ? "bg-bufo-100 border-2 border-dashed border-bufo-400"
                          : "bg-gray-50 border-2 border-dashed border-gray-300 hover:border-bufo-300 hover:bg-bufo-50"
                      }`}
                    >
                      <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center mr-2 overflow-hidden flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-bufo-400"
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
                      </div>
                      <div className="flex-grow">
                        <span className="text-sm font-medium text-bufo-600 block">
                          Add your image
                        </span>
                        <span className="text-xs text-gray-400">
                          Click or paste (Ctrl+V)
                        </span>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          handleFileUpload(e, idx);
                          setActiveLayerIndex(idx);
                        }}
                      />
                    </label>
                  );
                }

                return (
                  <div
                    key={layer.id}
                    onClick={() => setActiveLayerIndex(idx)}
                    className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                      idx === activeLayerIndex
                        ? "bg-bufo-100 border border-bufo-400"
                        : "bg-gray-50 border border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center mr-2 overflow-hidden flex-shrink-0">
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
                    <span className="text-sm font-medium flex-grow truncate">
                      {layer.name}
                    </span>
                    {isEditable && layer.imageData && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearLayerImage(idx);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                        title="Clear Image"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => {
                openDownloadModal();
                setIsSidebarOpen(false);
              }}
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
