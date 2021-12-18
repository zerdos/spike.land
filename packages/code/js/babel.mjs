import { getWrapped } from "./workers/getWorker.mjs";

export async function baberTransform(code) {
  const transform = await getWrapped("babel.worker.js");

  const transformed = await transform(
    code,
  );
  return transformed;
}
