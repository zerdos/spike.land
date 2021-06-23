import type { KV } from "../codeZedVisionHandler";
import { fileKV, shasumsKV } from "../codeZedVisionHandler";
import { text } from "@responds";
import { sha256 } from "../alterHeaders";

export async function check(filteredFiles: KV) {
  const missing: String[] = [];
  const wrongSha: KV[] = [];

  const deploySHA = await sha256(JSON.stringify(filteredFiles));

  const res = await SHAKV.get(deploySHA);

  if (res) {
    const resJson = JSON.parse(res);
    if (resJson.missing.length === 0) {
      return (text(JSON.stringify({ ...resJson, cached: true })));
    }
  }

  await Promise.all(
    Object.keys(filteredFiles).map(async (file) => {
      const kvRes = await IPFS.get(fileKV[file], "arrayBuffer");
      if (kvRes === null) {
        missing.push(fileKV[file]);
      } else {
        const sha = await sha256(kvRes);
        if (shasumsKV[file] !== sha) {
          wrongSha.push({ [file]: await sha256(kvRes) });
        }
      }
    }),
  );

  const result = JSON.stringify({ missing, wrongSha });

  await SHAKV.put(deploySHA, result);

  return text(result);
}
