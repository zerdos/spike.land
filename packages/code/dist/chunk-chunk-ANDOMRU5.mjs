import {
  init_define_process
} from "./chunk-chunk-IUWUEL4A.mjs";

// js/wait.ts
init_define_process();
async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

export {
  wait
};
