import { Bufo } from "./types";

export type CaseStyle = "original" | "kebab-case" | "camelCase" | "TitleCase" | "snake_case";

export function splitWords(str: string): string[] {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function toKebabCase(str: string): string {
  return splitWords(str).join("-").toLowerCase();
}

export function toCamelCase(str: string): string {
  const words = splitWords(str);
  return words
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}

export function toTitleCase(str: string): string {
  return splitWords(str)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

export function toSnakeCase(str: string): string {
  return splitWords(str).join("_").toLowerCase();
}

export function convertCase(str: string, style: CaseStyle): string {
  switch (style) {
    case "kebab-case":
      return toKebabCase(str);
    case "camelCase":
      return toCamelCase(str);
    case "TitleCase":
      return toTitleCase(str);
    case "snake_case":
      return toSnakeCase(str);
    default:
      return str;
  }
}

export function downloadBufo(bufo: Bufo): void {
  const link = document.createElement("a");
  link.href = `/bufos/${bufo.filename}`;
  link.download = bufo.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function copyBufoToClipboard(bufo: Bufo): Promise<boolean> {
  try {
    const response = await fetch(`/bufos/${bufo.filename}`);
    const blob = await response.blob();

    const clipboardItem = new ClipboardItem({
      [blob.type]: blob,
    });

    await navigator.clipboard.write([clipboardItem]);
    return true;
  } catch (error) {
    console.error("Failed to copy image to clipboard:", error);
    return false;
  }
}
