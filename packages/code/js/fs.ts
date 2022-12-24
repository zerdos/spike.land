import FS from "@isomorphic-git/lightning-fs";
// import FS from "@isomorphic-git/lightning-fs";

// import { fs } from 'memfs';

globalThis.fs = new FS(location.origin);
const p = globalThis.fs.promises;

// const readdir = globalThis.fs.readdir;

export const readdir = (filePath: string) => p.readdir(filePath);
export const writeFile = (filePath: string, content: string) => p.writeFile(filePath, content);
export const readfile = (filePath: string) => p.readFile(filePath);
export const stat = (filePath: string) => p.stat(filePath);
export const unlink = (filepath: string) => p.unlink(filepath);
export const mkdir = (filePath: string) => p.mkdir(filePath);
