// import FS from "@isomorphic-git/lightning-fs";
import FS from "@isomorphic-git/lightning-fs";
import * as memFS from "memfs";

// export const fs = new FS('fakeFS', {db: null});\

// import FS from "@isomorphic-git/lightning-fs";

let fsProb: FS | typeof memFS.fs;
try {
  if (typeof indexedDB === "undefined") fsProb = memFS.fs;
  else {
    // const FS = (await import("@isomorphic-git/lightning-fs")).default
    fsProb = new FS("fakeFS");
  }
} catch {
  fsProb = memFS.fs;
}

export const fs = fsProb;

const p = fs.promises;

// const readdir = globalThis.fs.readdir;

export const readdir = (filePath: string) => p.readdir(filePath).then(x => x.map(d => d.toString()));
export const writeFile = (filePath: string, content: string | Uint8Array) => p.writeFile(filePath, content);
export const readFile = (filePath: string) => p.readFile(filePath, { encoding: "utf8" });
export const stat = (filePath: string) => p.stat(filePath);
export const unlink = (filepath: string) => p.unlink(filepath);
export const mkdir = (filePath: string) => p.mkdir(filePath);
