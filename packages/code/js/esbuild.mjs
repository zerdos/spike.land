import { getWrapped } from "./workers/getWorker.mjs";

export async function transform(code) {
  var startTime = performance.now();

  const transform = await getWrapped("esbuild.worker.js");

  const transformed = await transform(
    code,
  );

  var endTime = performance.now();

  console.log(`esbuildTransform: took ${endTime - startTime} milliseconds`);
  return transformed.code;
}
