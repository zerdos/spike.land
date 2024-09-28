import { useSpeedy2 } from "./useArchive";

export const useDownload = (codeSpace: string, onlyReturn = false) => {
  return async () => {
    await useSpeedy2();
    const content = await fetch(`/live-cms/${codeSpace}.html`).then((res) => res.text());

    if (onlyReturn) {
      return content;
    }

    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${codeSpace}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return;
  };
};
