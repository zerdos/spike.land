import src from "./dist/workers/js/workers/prettier.worker.js";
import { getWrappedFromWorkerSrc } from "./getWorker.mjs";

/**
 * @param {string} code
 * @returns {Promise<string>}
 */

const format = getWrappedFromWorkerSrc(src);

export const formatter = async (code) => {
  const { formatter: prettier } = await import("./prettierEsm.ts");
  return prettier(code);
};
