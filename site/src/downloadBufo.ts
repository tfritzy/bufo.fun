export const downloadBufo = (filename: string) => {
  const link = document.createElement("a");
  link.href = "/bufos/" + filename;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
