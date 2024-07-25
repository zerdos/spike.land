import ts from "typescript";
import { setupTypeAcquisition } from "@typescript/ata";

export const myATA = (code: string)=> {

const ata = setupTypeAcquisition({
  projectName: "My ATA Project,",
  logger: console,
  typescript: ts,
  delegate: {
    receivedFile: (code: string, path: string) => {
      // Add code to your runtime at the path...
      console.log("ATA received file", { code, path });
    },
    started: () => {
      console.log("ATA start");
    },
    progress: (downloaded: number, total: number) => {
      console.log(`Got ${downloaded} out of ${total}`);
    },
    finished: (vfs) => {
      console.log("ATA done", vfs);
    },
  },
});

// Run that function with the new sourcefile
return ata(code);

}