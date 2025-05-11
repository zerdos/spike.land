import { tryCatch } from "@/lib/try-catch";
import { getSpeedy2 } from "@/lib/use-archive";

const download = async (
  codeSpace: string,
  onlyReturn: boolean,
): Promise<string | void> => {
  console.warn( // Changed to warn
    `useDownload hook called with codeSpace: ${codeSpace}, onlyReturn: ${onlyReturn}`,
  );
  console.warn("Starting download process"); // Changed to warn

  const downloadProcess = async () => {
    await getSpeedy2();
    console.warn("getSpeedy2 completed"); // Changed to warn

    const url = `/live-cms/${codeSpace}.html`;
    console.warn(`Fetching content from: ${url}`); // Changed to warn
    const response = await fetch(url);

    if (!response || !response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const content = await response.text();
    console.warn(`Content fetched, length: ${content.length} characters`); // Changed to warn

    if (onlyReturn) {
      console.warn("Returning content without downloading"); // Changed to warn
      return content;
    }

    console.warn("Creating Blob and initiating download"); // Changed to warn
    const blob = new Blob([content], { type: "text/html" });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${codeSpace}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);

    console.warn("Download process completed"); // Changed to warn
    // Explicitly return void when not returning content
  };

  const { data, error } = await tryCatch<string | void>(downloadProcess());

  if (error) {
    console.error("Error in useDownload:", error);
    throw error;
  }
  return data;
};

export const useDownload = (codeSpace: string, onlyReturn = false) => {
  return () => download(codeSpace, onlyReturn);
};
