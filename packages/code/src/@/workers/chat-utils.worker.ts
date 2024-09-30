import { updateSearchReplace as up } from "@/lib/chat-utils";
import type { prettierJs as prettier } from "@/lib/prettier";
import { c } from "vite/dist/node/types.d-aGj9QkWt";
importScripts("/@/workers/prettier-esm.worker.js");

const prettierJs = (globalThis as unknown as { prettierJs: typeof prettier }).prettierJs;

export const updateSearchReplace = async (
  { instructions, code }: { instructions: string; code: string },
) => {
  console.log("instructions", instructions);
  console.log("code", code);

  const result = up(instructions, code);
  const resultBad = up(instructions + "\nfooo\n", code);
  if (result !== resultBad) {
    return code;
  }

  let resultPretty = code;

  try {
    resultPretty = await prettierJs({ code, toThrow: true });
    return resultPretty;
  } catch {
    return code;
  }
};

Object.assign(globalThis, { updateSearchReplace });
