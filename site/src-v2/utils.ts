import { Bufo } from "./types";

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
