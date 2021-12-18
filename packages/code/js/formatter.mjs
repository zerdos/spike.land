
import { getWrapped } from "./workers/getWorker.mjs";



/**
 * @param {string} code
 * @returns {Promise<string>}
 */
export async function formatter(code) {
  console.log("Formatter Req");
  const format = await getWrapped("prettierWorker.js");

  
  const formatted = await (format)(
    code,
  );
  console.log("formatter resp");
  return formatted;
}
