import { TemplateLayer } from "../builderTemplates";

interface LayerState extends TemplateLayer {
  imageData: string | null;
}

interface BuilderSidebarProps {
  canvasWidth: number;
  canvasHeight: number;
  widthInput: string;
  heightInput: string;
  onWidthChange: (value: string) => void;
  onHeightChange: (value: string) => void;
  onWidthBlur: () => void;
  onHeightBlur: () => void;
  layers: LayerState[];
  activeLayerIndex: number;
  onLayerClick: (index: number) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, targetLayerIndex?: number) => void;
  onClearLayerImage: (index: number) => void;
  isUserEditableLayer: (layer: LayerState) => boolean;
  onDownload: () => void;
  onAddLayer: () => void;
  onRemoveLayer: (index: number) => void;
  onMoveLayer: (index: number, direction: 1 | -1) => void;
  onToggleVisibility: (index: number) => void;
  onToggleFlip: (index: number, axis: "x" | "y") => void;
  onRotate: (index: number, rotation: number) => void;
}

function Icon({ d }: { d: string }) {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    </svg>
  );
}

const ICONS = {
  eye: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  eyeOff: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21",
  up: "M5 15l7-7 7 7",
  down: "M19 9l-7 7-7-7",
  flip: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  flipVertical: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4",
  rotateLeft: "M9 14L4 9l5-5 M4 9h10.5a5.5 5.5 0 010 11H11",
  rotateRight: "M15 14l5-5-5-5 M20 9H9.5a5.5 5.5 0 000 11H13",
  trash: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
};

export function BuilderSidebar({
  canvasWidth,
  canvasHeight,
  widthInput,
  heightInput,
  onWidthChange,
  onHeightChange,
  onWidthBlur,
  onHeightBlur,
  layers,
  activeLayerIndex,
  onLayerClick,
  onFileUpload,
  onClearLayerImage,
  isUserEditableLayer,
  onDownload,
  onAddLayer,
  onRemoveLayer,
  onMoveLayer,
  onToggleVisibility,
  onToggleFlip,
  onRotate,
}: BuilderSidebarProps) {
  const activeLayer = layers[activeLayerIndex];
  const toolButton =
    "flex-1 flex items-center justify-center p-2 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors";

  return (
    <aside className="hidden md:flex md:relative inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 flex-col overflow-y-auto">
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
                onChange={(e) => onWidthChange(e.target.value)}
                onBlur={onWidthBlur}
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
                onChange={(e) => onHeightChange(e.target.value)}
                onBlur={onHeightBlur}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-bufo-300 outline-none transition-shadow"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Layers
          </h3>
          <button
            onClick={onAddLayer}
            className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-bufo-600 hover:bg-bufo-50 rounded transition-colors"
          >
            <Icon d="M12 4v16m8-8H4" />
            Add layer
          </button>
        </div>
        {layers.length === 0 && (
          <button
            onClick={onAddLayer}
            className="w-full p-4 rounded-md border-2 border-dashed border-gray-300 hover:border-bufo-300 hover:bg-bufo-50 text-sm text-gray-500 transition-colors"
          >
            Add a bufo, accessory, or your own image
          </button>
        )}
        <div className="space-y-2">
          {[...layers].reverse().map((layer, reversedIdx) => {
            const idx = layers.length - 1 - reversedIdx;
            const isEditable = isUserEditableLayer(layer);
            const isEmptyEditableLayer = isEditable && !layer.imageData;

            if (isEmptyEditableLayer) {
              return (
                <label
                  key={layer.id}
                  onClick={() => onLayerClick(idx)}
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
                      onFileUpload(e, idx);
                      onLayerClick(idx);
                    }}
                  />
                </label>
              );
            }

            return (
              <div
                key={layer.id}
                onClick={() => onLayerClick(idx)}
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
                      className="w-full h-full object-contain"
                    />
                  ) : layer.file ? (
                    <img
                      src={layer.file}
                      alt={layer.name}
                      className="w-full h-full object-contain"
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
                <span
                  className={`text-sm font-medium flex-grow truncate ${
                    layer.visible ? "" : "text-gray-400 line-through"
                  }`}
                >
                  {layer.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVisibility(idx);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded transition-colors"
                  title={layer.visible ? "Hide layer" : "Show layer"}
                >
                  <Icon d={layer.visible ? ICONS.eye : ICONS.eyeOff} />
                </button>
                {isEditable && layer.imageData && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearLayerImage(idx);
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
        {activeLayer && (
          <div className="mt-3 flex gap-1 p-1 bg-gray-50 rounded-md border border-gray-200">
            <button
              onClick={() => onMoveLayer(activeLayerIndex, 1)}
              disabled={activeLayerIndex === layers.length - 1}
              className={toolButton}
              title="Bring forward"
            >
              <Icon d={ICONS.up} />
            </button>
            <button
              onClick={() => onMoveLayer(activeLayerIndex, -1)}
              disabled={activeLayerIndex === 0}
              className={toolButton}
              title="Send backward"
            >
              <Icon d={ICONS.down} />
            </button>
            <button
              onClick={() => onToggleFlip(activeLayerIndex, "x")}
              className={`${toolButton} ${activeLayer.flipX ? "bg-bufo-100 text-bufo-600" : ""}`}
              title="Flip horizontally"
              aria-pressed={!!activeLayer.flipX}
            >
              <Icon d={ICONS.flip} />
            </button>
            <button
              onClick={() => onToggleFlip(activeLayerIndex, "y")}
              className={`${toolButton} ${activeLayer.flipY ? "bg-bufo-100 text-bufo-600" : ""}`}
              title="Flip vertically"
              aria-pressed={!!activeLayer.flipY}
            >
              <Icon d={ICONS.flipVertical} />
            </button>
            <button
              onClick={() => onRemoveLayer(activeLayerIndex)}
              className={`${toolButton} hover:text-red-500`}
              title="Delete layer"
            >
              <Icon d={ICONS.trash} />
            </button>
          </div>
        )}
        {activeLayer && (
          <div className="mt-2 flex items-center gap-1 p-1 bg-gray-50 rounded-md border border-gray-200">
            <button
              onClick={() =>
                onRotate(activeLayerIndex, (activeLayer.rotation ?? 0) - 15)
              }
              className={toolButton}
              title="Rotate left 15°"
            >
              <Icon d={ICONS.rotateLeft} />
            </button>
            <label className="flex items-center gap-1 text-sm text-gray-600">
              <input
                type="number"
                value={activeLayer.rotation ?? 0}
                onChange={(e) =>
                  onRotate(activeLayerIndex, Number(e.target.value) || 0)
                }
                className="w-14 px-1 py-1 text-sm text-right border border-gray-300 rounded focus:ring-2 focus:ring-bufo-300 outline-none"
                aria-label="Rotation in degrees"
              />
              °
            </label>
            <button
              onClick={() =>
                onRotate(activeLayerIndex, (activeLayer.rotation ?? 0) + 15)
              }
              className={toolButton}
              title="Rotate right 15°"
            >
              <Icon d={ICONS.rotateRight} />
            </button>
            <button
              onClick={() => onRotate(activeLayerIndex, 0)}
              disabled={!activeLayer.rotation}
              className={`${toolButton} text-xs`}
              title="Reset rotation"
            >
              Reset
            </button>
          </div>
        )}
        {activeLayer && (
          <p className="mt-2 text-xs text-gray-400">
            Drag to move, corners to resize, the round handle to rotate. Arrow
            keys nudge (Shift for 10px); [ and ] rotate 15° (Shift for 1°).
          </p>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <button
          onClick={onDownload}
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
  );
}
