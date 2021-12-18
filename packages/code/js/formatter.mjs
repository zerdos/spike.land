import { getWrapped } from "./workers/getWorker.mjs";

/**
 * @param {string} code
 * @returns {Promise<string>}
 */
export async function formatter(code) {
  const format = await getWrapped("prettierWorker.js");

  const formatted = await (format)(
    code,
  );
  return formatted;
}
