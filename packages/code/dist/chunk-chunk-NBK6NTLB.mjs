import {
  __name,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// js/wait.ts
init_define_process();
async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}
__name(wait, "wait");

export {
  wait
};
