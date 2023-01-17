// import FS from "@isomorphic-git/lightning-fs";
// import FS from "@isomorphic-git/lightning-fs";
import { Mutex } from "async-mutex";
import * as memFS from "memfs";

// export const fs = new FS('fakeFS', {db: null});\

import FS from "@isomorphic-git/lightning-fs";

let fsProb: FS | typeof memFS.fs;

try {
  if (typeof indexedDB === "undefined") fsProb = memFS.fs;
  else {
    // const FS = (await import("@isomorphic-git/lightning-fs")).default;
    fsProb = new FS("fakeFS");
  }
} catch {
  fsProb = memFS.fs;
}

export const fs = fsProb;

const p = fs.promises;

// const readdir = globalThis.fs.readdir;
const origin = typeof location !== "undefined" ? location.origin : "";
const files: { [key: string]: string } = globalThis.files = globalThis.files
  || {};
const controllers: { [key: string]: AbortController } = globalThis.controllers = globalThis.controllers || {};

const mutex = new Mutex();

export const readdir = (filePath: string) =>
  mutex.runExclusive(() =>
    p.readdir(filePath).then((x) => x.map((d) => d.toString())).catch(() =>
      p.mkdir(filePath).then(() => p.readdir(filePath))
    )
  );
export const writeFile = async (filePath: string, content: string) => {
  if (files[filePath] === content) return;
  if (controllers[filePath]) controllers[filePath].abort();
  controllers[filePath] = new AbortController();
  const signal = controllers[filePath].signal;

  setTimeout(() => {
    if (files[filePath] === content) return;
    if (signal.aborted) return;
    console.log("write", filePath);
    files[filePath] = content;
    return p.writeFile(
      filePath,
      content,
    );
  });
};

export const readFile = async (filePath: string) =>
  files[filePath]
    ? files[filePath]
    : await mutex.runExclusive(() =>
      p.readFile(filePath, { encoding: "utf8" }).catch(() => fetch(origin + filePath).then((x) => x.text()))
    );
export const unlink = (filepath: string) =>
  mutex.runExclusive(() => p.unlink(filepath).catch(() => {/** nothing really happened */}));
export const mkdir = (filePath: string) => mutex.runExclusive(() => p.mkdir(filePath).catch(() => {}));

export default { readFile, unlink, mkdir, writeFile, readdir, Mutex };
Object.assign(self, { readFile, unlink, mkdir, writeFile, readdir, Mutex });
