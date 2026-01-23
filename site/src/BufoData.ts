export type Tag = string;

export type BufoJsonEntry = {
  name: string;
  filename: string;
  tags: string[];
  skip: boolean;
};

export type BufoDataJson = {
  tags: string[];
  bufos: BufoJsonEntry[];
};

export type BufoDetails = {
  name: string;
  filename: string;
  tags: Set<Tag>;
};

export async function loadBufoData(): Promise<BufoDetails[]> {
  const response = await fetch('/bufo-data.json');
  const data = (await response.json()) as BufoDataJson;

  return data.bufos
    .filter((entry) => !entry.skip)
    .map((entry) => ({
      name: entry.name,
      filename: entry.filename,
      tags: new Set(entry.tags),
    }));
}
