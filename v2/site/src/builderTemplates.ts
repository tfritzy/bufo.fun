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
  locked: boolean;
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
        id: "offering",
        name: "Your Image",
        file: "",
        position: { x: 180, y: 280, width: 140, height: 140 },
        locked: false,
        visible: true,
      },
    ],
    activeLayerIndex: 0,
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
        id: "item",
        name: "Your Image",
        file: "",
        position: { x: 160, y: 200, width: 160, height: 160 },
        locked: false,
        visible: true,
      },
    ],
    activeLayerIndex: 0,
  },
];

export function getTemplateById(id: string): BuilderTemplate | undefined {
  return builderTemplates.find((t) => t.id === id);
}
