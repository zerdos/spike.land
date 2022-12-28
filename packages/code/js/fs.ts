import FS from "@isomorphic-git/lightning-fs";
// import FS from "@isomorphic-git/lightning-fs";

// import { fs } from 'memfs';

export const fs = new FS(location.origin);
const p = fs.promises;

// const readdir = globalThis.fs.readdir;

export const readdir = (filePath: string) => p.readdir(filePath);
export const writeFile = (filePath: string, content: string | Uint8Array) => p.writeFile(filePath, content);
export const readFile = (filePath: string) => p.readFile(filePath, { encoding: "utf8" });
export const stat = (filePath: string) => p.stat(filePath);
export const unlink = (filepath: string) => p.unlink(filepath);
export const mkdir = (filePath: string) => p.mkdir(filePath);
