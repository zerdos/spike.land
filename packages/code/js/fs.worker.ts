import FS from "@isomorphic-git/lightning-fs";
import { expose } from "comlink";
// importScripts("../../../dist/umd/comlink.js");

export type {};
declare const self: SharedWorkerGlobalScope & {};

globalThis.fs = new FS(location.origin);
const fs = globalThis.fs.promises;

/**
 * When a connection is made into this shared worker, expose `obj`
 * via the connection `port`.
 */
onconnect = function(event) {
  const port = event.ports[0];

  expose(fs, port);
};

// Single line alternative:
// onconnect = (e) => Comlink.expose(obj, e.ports[0]);
