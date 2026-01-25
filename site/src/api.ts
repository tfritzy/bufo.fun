import { BufoData, Bufo, toBufo } from "./types";

const BUFO_DATA_URL = "/bufo-data.json";

export async function fetchBufoData(): Promise<{
  bufos: Bufo[];
  allTags: string[];
}> {
  const response = await fetch(BUFO_DATA_URL);

  if (!response.ok) {
    throw new Error(`Failed to load bufo data: ${response.status}`);
  }

  const data: BufoData = await response.json();

  const uniqueBufos = data.bufos.reduce((acc, bufo) => {
    if (!acc.has(bufo.id)) {
      acc.set(bufo.id, bufo);
    }
    return acc;
  }, new Map());

  return {
    bufos: Array.from(uniqueBufos.values()).map(toBufo),
    allTags: data.tags,
  };
}
