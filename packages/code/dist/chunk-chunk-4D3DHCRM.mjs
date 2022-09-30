import {
  init_define_process
} from "./chunk-chunk-IA5ZPNWL.mjs";

// inline-worker:__inline-worker
init_define_process();
function inlineWorker(scriptText) {
  let blob = new Blob([scriptText], { type: "text/javascript" });
  let url = URL.createObjectURL(blob);
  let worker = new Worker(url);
  URL.revokeObjectURL(url);
  return worker;
}

export {
  inlineWorker
};
