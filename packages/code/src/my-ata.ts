import { QueuedFetch } from "@/lib/queued-fetch";
import { setupTypeAcquisition } from "@typescript/ata";
import ts from "typescript";

const limitedFetch = new QueuedFetch(4, 1000);

export const myATA = async (code: string) => {
  const myPromise = new Promise<Map<string, string>>((resolve) => {
    const ata = setupTypeAcquisition({
      projectName: "My ATA Project,",
      logger: console,
      fetcher: limitedFetch.fetch.bind(limitedFetch) as unknown as typeof fetch,
      typescript: ts,
      delegate: {
        receivedFile: (code: string, path: string) => {
          // Add code to your runtime at the path...
          console.warn("ATA received file", { code, path });
        },
        started: () => {
          console.warn("ATA start");
        },
        progress: (downloaded: number, total: number) => {
          console.warn(`Got ${downloaded} out of ${total}`);
        },
        finished: (vfs) => {
          resolve(vfs);
          console.warn("ATA done", vfs);
        },
      },
    });

    ata(code);
  });

  const filed = await myPromise;

  const monacoExtraLibs: Array<{ filePath: string; content: string; }> = [];

  for (const [filePath, content] of filed.entries()) {
    monacoExtraLibs.push({
      filePath: filePath.slice(13).split("@types/").join(""),
      content,
    });
  }
  return monacoExtraLibs;
};

// Run that function with the new sourcefile
