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
}

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
}: BuilderSidebarProps) {
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
