import {
  EditorSimpleWorker,
  SimpleWorkerServer
} from "./chunk-chunk-I3P7REVB.mjs";
import {
  init_define_process
} from "./chunk-chunk-6E6HXLU2.mjs";

// ../../node_modules/monaco-editor/esm/vs/editor/editor.worker.js
init_define_process();
var initialized = false;
function initialize(foreignModule) {
  if (initialized) {
    return;
  }
  initialized = true;
  const simpleWorker = new SimpleWorkerServer((msg) => {
    self.postMessage(msg);
  }, (host) => new EditorSimpleWorker(host, foreignModule));
  self.onmessage = (e) => {
    simpleWorker.onmessage(e.data);
  };
}
self.onmessage = (e) => {
  if (!initialized) {
    initialize(null);
  }
};

export {
  initialize
};
