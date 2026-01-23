// Core data types for bufo.fun

export interface BufoEntry {
  id: string;
  fileType: string;
  tags: string[];
}

export interface BufoData {
  tags: string[];
  bufos: BufoEntry[];
}

// Derived type with computed filename property
export interface Bufo extends BufoEntry {
  filename: string;
}

// Convert raw entry to Bufo with filename
export function toBufo(entry: BufoEntry): Bufo {
  return {
    ...entry,
    filename: `${entry.id}.${entry.fileType}`,
  };
}
