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
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [bufoName, setBufoName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const exportCanvasRef = useRef<HTMLCanvasElement>(null);
  const layerIdCounter = useRef(0);

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

  const getDefaultPosition = (tmpl: typeof template): LayerPosition => ({
    x: tmpl ? tmpl.canvasWidth / 4 : 0,
    y: tmpl ? tmpl.canvasHeight / 4 : 0,
    width: tmpl ? tmpl.canvasWidth / 2 : 150,
    height: tmpl ? tmpl.canvasHeight / 2 : 150,
  });

  const layerHasNoPosition = (layer: LayerState): boolean =>
    layer.position.width === 0 && layer.position.height === 0;

  const updateLayerWithImage = (
    layer: LayerState,
    imageData: string
  ): LayerState => {
    if (layerHasNoPosition(layer) && template) {
      return { ...layer, imageData, position: getDefaultPosition(template) };
    }
    return { ...layer, imageData };
  };

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
                  idx === activeLayerIndex
                    ? updateLayerWithImage(layer, imageData)
                    : layer
                )
              );
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    },
    [activeLayerIndex, template]
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
      setLayers((prev) =>
        prev.map((layer, idx) =>
          idx === layerIndex ? updateLayerWithImage(layer, imageData) : layer
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

  const toggleLayerVisibility = (index: number) => {
    setLayers((prev) =>
      prev.map((layer, idx) =>
        idx === index ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };

  const addLayer = () => {
    layerIdCounter.current += 1;
    const newLayer: LayerState = {
      id: `layer-${layerIdCounter.current}`,
      name: `Layer ${layers.length + 1}`,
      file: "",
      position: { x: 0, y: 0, width: 0, height: 0 },
      visible: true,
      imageData: null,
    };
    setLayers((prev) => [...prev, newLayer]);
    setActiveLayerIndex(layers.length);
  };

  const removeLayer = (index: number) => {
    if (layers.length <= 1) return;
    setLayers((prev) => prev.filter((_, idx) => idx !== index));
    if (activeLayerIndex >= index && activeLayerIndex > 0) {
      setActiveLayerIndex(activeLayerIndex - 1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setActiveLayerIndex(index);
    setIsDragging(true);
    setDragStart({
      x: e.clientX - layers[index].position.x,
      y: e.clientY - layers[index].position.y,
    });
  };

  const handleResizeStart = (e: React.MouseEvent, index: number, direction: string) => {
    e.stopPropagation();
    setActiveLayerIndex(index);
    setIsResizing(true);
    setResizeDirection(direction);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialSize({
      width: layers[index].position.width,
      height: layers[index].position.height,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && !isResizing) return;

    const layer = layers[activeLayerIndex];
    if (!layer) return;

    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      updateLayerPosition(activeLayerIndex, { x: newX, y: newY });
    } else if (isResizing) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      let updates: Partial<LayerPosition> = {};

      switch (resizeDirection) {
        case 'se':
          const seDelta = Math.max(deltaX, deltaY);
          updates = {
            width: Math.max(50, initialSize.width + seDelta),
            height: Math.max(50, initialSize.height + seDelta),
          };
          break;
        case 'nw':
          const nwDelta = Math.max(-deltaX, -deltaY);
          const nwNewSize = Math.max(50, initialSize.width + nwDelta);
          updates = {
            x: layer.position.x - (nwNewSize - layer.position.width),
            y: layer.position.y - (nwNewSize - layer.position.height),
            width: nwNewSize,
            height: nwNewSize,
          };
          break;
        case 'ne':
          const neDelta = Math.max(deltaX, -deltaY);
          const neNewSize = Math.max(50, initialSize.width + neDelta);
          updates = {
            y: layer.position.y - (neNewSize - layer.position.height),
            width: neNewSize,
            height: neNewSize,
          };
          break;
        case 'sw':
          const swDelta = Math.max(-deltaX, deltaY);
          const swNewSize = Math.max(50, initialSize.width + swDelta);
          updates = {
            x: layer.position.x - (swNewSize - layer.position.width),
            width: swNewSize,
            height: swNewSize,
          };
          break;
        case 'n':
          updates = {
            y: layer.position.y + deltaY,
            height: Math.max(50, initialSize.height - deltaY),
          };
          break;
        case 's':
          updates = {
            height: Math.max(50, initialSize.height + deltaY),
          };
          break;
        case 'e':
          updates = {
            width: Math.max(50, initialSize.width + deltaX),
          };
          break;
        case 'w':
          updates = {
            x: layer.position.x + deltaX,
            width: Math.max(50, initialSize.width - deltaX),
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
    if (!canvas || !template) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

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

    return canvas.toDataURL("image/png");
  };

  const openDownloadModal = async () => {
    const preview = await generatePreview();
    setPreviewUrl(preview);
    setBufoName(`bufo-${template?.id || "custom"}`);
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
      <div className="flex flex-grow h-full">
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Layers
              </h3>
              <button
                onClick={addLayer}
                className="p-1 text-gray-500 hover:text-bufo-500 hover:bg-bufo-50 rounded transition-colors"
                title="Add Layer"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {[...layers].reverse().map((layer, reversedIdx) => {
                const idx = layers.length - 1 - reversedIdx;
                const hasImage = layer.imageData || layer.file;
                const isEmptyEditableLayer = !hasImage;

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
                    <div className="flex items-center space-x-1 ml-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLayerVisibility(idx);
                        }}
                        className={`p-1 rounded transition-colors ${
                          layer.visible
                            ? "text-gray-500 hover:text-bufo-500"
                            : "text-gray-300 hover:text-gray-500"
                        }`}
                        title={layer.visible ? "Hide Layer" : "Show Layer"}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {layer.visible ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          )}
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeLayer(idx);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                        title="Remove Layer"
                        disabled={layers.length <= 1}
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={openDownloadModal}
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
            if (!imgSrc) return null;

            const isActive = idx === activeLayerIndex;

            return (
              <div
                key={layer.id}
                className={`absolute cursor-move ${isActive ? "ring-2 ring-bufo-500 ring-offset-2" : ""}`}
                style={{
                  left: layer.position.x,
                  top: layer.position.y,
                  width: layer.position.width,
                  height: layer.position.height,
                  zIndex: idx,
                }}
                onMouseDown={(e) => handleMouseDown(e, idx)}
              >
                <img
                  src={imgSrc}
                  alt={layer.name}
                  className="w-full h-full object-contain pointer-events-none"
                  draggable={false}
                />
                {isActive && (
                  <>
                    <div
                      className="absolute top-0 left-0 w-3 h-3 bg-white border-2 border-bufo-500 cursor-nw-resize -translate-x-1/2 -translate-y-1/2"
                      onMouseDown={(e) => handleResizeStart(e, idx, 'nw')}
                    />
                    <div
                      className="absolute top-0 left-1/2 w-3 h-3 bg-white border-2 border-bufo-500 cursor-n-resize -translate-x-1/2 -translate-y-1/2"
                      onMouseDown={(e) => handleResizeStart(e, idx, 'n')}
                    />
                    <div
                      className="absolute top-0 right-0 w-3 h-3 bg-white border-2 border-bufo-500 cursor-ne-resize translate-x-1/2 -translate-y-1/2"
                      onMouseDown={(e) => handleResizeStart(e, idx, 'ne')}
                    />
                    <div
                      className="absolute top-1/2 right-0 w-3 h-3 bg-white border-2 border-bufo-500 cursor-e-resize translate-x-1/2 -translate-y-1/2"
                      onMouseDown={(e) => handleResizeStart(e, idx, 'e')}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-3 h-3 bg-white border-2 border-bufo-500 cursor-se-resize translate-x-1/2 translate-y-1/2"
                      onMouseDown={(e) => handleResizeStart(e, idx, 'se')}
                    />
                    <div
                      className="absolute bottom-0 left-1/2 w-3 h-3 bg-white border-2 border-bufo-500 cursor-s-resize -translate-x-1/2 translate-y-1/2"
                      onMouseDown={(e) => handleResizeStart(e, idx, 's')}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-3 h-3 bg-white border-2 border-bufo-500 cursor-sw-resize -translate-x-1/2 translate-y-1/2"
                      onMouseDown={(e) => handleResizeStart(e, idx, 'sw')}
                    />
                    <div
                      className="absolute top-1/2 left-0 w-3 h-3 bg-white border-2 border-bufo-500 cursor-w-resize -translate-x-1/2 -translate-y-1/2"
                      onMouseDown={(e) => handleResizeStart(e, idx, 'w')}
                    />
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
                  className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
