import { getWrapped } from "./workers/getWorker.mjs";

export async function babelTransform(code) {
  var startTime = performance.now()

  

  const transform = await getWrapped("babel.worker.js");

  const transformed = await transform(
    code,
  );

  var endTime = performance.now()

  console.log(`babelTransform: took ${endTime - startTime} milliseconds`)

  return transformed;
}
