export interface LayerPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TemplateLayer {
  id: string;
  name: string;
  file: string;
  position: LayerPosition;
  visible: boolean;
}

export interface BuilderTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  canvasWidth: number;
  canvasHeight: number;
  layers: TemplateLayer[];
  activeLayerIndex: number;
}

export const builderTemplates: BuilderTemplate[] = [
  {
    id: "bufo-offers",
    name: "Bufo Offers",
    description: "Create a bufo offering something special",
    thumbnail: "/bufos/bufo-offers.png",
    canvasWidth: 128,
    canvasHeight: 128,
    layers: [
      {
        id: "base",
        name: "Base Bufo",
        file: "/bufos/bufo-offers.png",
        position: { x: 0, y: 0, width: 128, height: 128 },
        visible: true,
      },
      {
        id: "offering",
        name: "Your Image",
        file: "",
        position: { x: 46, y: 72, width: 36, height: 36 },
        visible: true,
      },
      {
        id: "arm",
        name: "Bufo Arm",
        file: "/bufos/bufo-arm.png",
        position: { x: 0, y: 0, width: 128, height: 128 },
        visible: true,
      },
    ],
    activeLayerIndex: 1,
  },
  {
    id: "bufo-takes",
    name: "Bufo Takes",
    description: "Create a bufo taking something",
    thumbnail: "/bufos/bufo-takes.png",
    canvasWidth: 128,
    canvasHeight: 128,
    layers: [
      {
        id: "base",
        name: "Base Bufo",
        file: "/bufos/bufo-takes.png",
        position: { x: 0, y: 0, width: 128, height: 128 },
        visible: true,
      },
      {
        id: "item",
        name: "Your Image",
        file: "",
        position: { x: 40, y: 50, width: 48, height: 48 },
        visible: true,
      },
      {
        id: "arm",
        name: "Bufo Arm",
        file: "/bufos/bufo-takes-hand.png",
        position: { x: 0, y: 0, width: 128, height: 128 },
        visible: true,
      },
    ],
    activeLayerIndex: 1,
  },
];

export function getTemplateById(id: string): BuilderTemplate | undefined {
  return builderTemplates.find((t) => t.id === id);
}
