import { getWrapped } from "./workers/getWorker.mjs";

export async function baberTransform(code) {
  console.log("babel req");
  const transform = await getWrapped("babel.worker.js");

  const transformed = await transform(
    code,
  );
  console.log("Babel resp");
  return transformed;
}
