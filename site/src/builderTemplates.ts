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
    thumbnail: "/bufos/bufo-offers-a-cookie.png",
    canvasWidth: 500,
    canvasHeight: 500,
    layers: [
      {
        id: "base",
        name: "Base Bufo",
        file: "/bufos/bufo-blank-stare.png",
        position: { x: 50, y: 50, width: 400, height: 400 },
        visible: true,
      },
      {
        id: "offering",
        name: "Your Image",
        file: "",
        position: { x: 180, y: 280, width: 140, height: 140 },
        visible: true,
      },
      {
        id: "arm",
        name: "Bufo Arm",
        file: "/bufos/bufo-offers-a-cookie.png",
        position: { x: 150, y: 200, width: 200, height: 200 },
        visible: true,
      },
    ],
    activeLayerIndex: 1,
  },
  {
    id: "bufo-takes",
    name: "Bufo Takes",
    description: "Create a bufo taking something",
    thumbnail: "/bufos/bufo-takes-your-boba.png",
    canvasWidth: 500,
    canvasHeight: 500,
    layers: [
      {
        id: "base",
        name: "Base Bufo",
        file: "/bufos/bufo-blank-stare.png",
        position: { x: 50, y: 50, width: 400, height: 400 },
        visible: true,
      },
      {
        id: "item",
        name: "Your Image",
        file: "",
        position: { x: 160, y: 200, width: 160, height: 160 },
        visible: true,
      },
      {
        id: "arm",
        name: "Bufo Arm",
        file: "/bufos/bufo-takes-your-boba.png",
        position: { x: 120, y: 150, width: 250, height: 250 },
        visible: true,
      },
    ],
    activeLayerIndex: 1,
  },
];

export function getTemplateById(id: string): BuilderTemplate | undefined {
  return builderTemplates.find((t) => t.id === id);
}
