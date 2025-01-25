// import FS from "@isomorphic-git/lightning-fs";
// import { expose } from "comlink";
// // importScripts("../../../dist/umd/comlink.js");

// export type {};
// declare const self: SharedWorkerGlobalScope & {};

// const fs = new FS(location.origin);
// const p = fs.promises;

// // const readdir = globalThis.fs.readdir;

// const oo = {
//   readdir: (filePath: string) => p.readdir(filePath).then(x => x.values),
//   writeFile: (filePath: string, content: string) => p.writeFile(filePath, content),
//   readFile: (filePath: string) => p.readFile(filePath),
//   stat: (filePath: string) => p.stat(filePath),
//   unlink: (filepath: string) => p.unlink(filepath),
//   mkdir: (filePath: string) => p.mkdir(filePath),
// };

// /**
//  * When a connection is made into this shared worker, expose `obj`
//  * via the connection `port`.
//  */
// onconnect = function(event) {
//   const port = event.ports[0];

//   expose(oo, port);
// };

// // Single line alternative:
// // onconnect = (e) => Comlink.expose(obj, e.ports[0]);
