import { getSpeedy2 } from "@/lib/use-archive";
import { tryCatch } from "@/lib/try-catch";

const download = async (
  codeSpace: string,
  onlyReturn: boolean,
): Promise<string | void> => {
  console.log(
    `useDownload hook called with codeSpace: ${codeSpace}, onlyReturn: ${onlyReturn}`,
  );
  console.log("Starting download process");

  const downloadProcess = async () => {
    await getSpeedy2();
    console.log("getSpeedy2 completed");

    const url = `/live-cms/${codeSpace}.html`;
    console.log(`Fetching content from: ${url}`);
    const response = await fetch(url);

    if (!response || !response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const content = await response.text();
    console.log(`Content fetched, length: ${content.length} characters`);

    if (onlyReturn) {
      console.log("Returning content without downloading");
      return content;
    }

    console.log("Creating Blob and initiating download");
    const blob = new Blob([content], { type: "text/html" });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${codeSpace}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);

    console.log("Download process completed");
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
