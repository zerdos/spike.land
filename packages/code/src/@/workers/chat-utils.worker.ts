import { updateSearchReplace as up } from "@/lib/chat-utils";
import type { prettierJs as prettier } from "@/lib/prettier";

importScripts("/@/workers/prettier-esm.worker.js");

console.log("chat-utils.worker.ts loaded");

const prettierJs = (globalThis as unknown as { prettierJs: typeof prettier }).prettierJs;

console.log("prettierJs function imported:", prettierJs);

const REPLACE = ">>>>>>> REPLACE";
export const updateSearchReplace = async (
  { instructions, code }: { instructions: string; code: string },
): Promise<{ result: string; resultPretty?: string; len: number }> => {
  console.log("updateSearchReplace function called", { instructions, code });
  const hadReplace = instructions.includes(REPLACE);
  instructions = instructions.slice(0, instructions.indexOf(REPLACE) + REPLACE.length);

  const result = up(instructions, code);
  const resultWithExtra = up(instructions + "\nfooo\n", code);

  if (result !== resultWithExtra) {
    console.log("Result differs with extra instructions, returning original code");
    return { result: code, len: 0 };
  }

  if (result === code || result === up("", code)) {
    console.log("No changes made, returning original code");
    return { result: code, len: 0 };
  }

  // Logarithmic search to find the effective instruction length
  let low = instructions.length;
  if (!hadReplace) {
    low = 0;
    let high = instructions.length;
    while (low < high) {
      const mid = Math.floor((low + high + 1) / 2);
      if (result === up(instructions.slice(0, mid), code)) {
        low = mid;
      } else {
        high = mid - 1;
      }
    }
  }
  const len = low;

  console.log("Attempting to prettify the code");
  console.log("Code length:", { result, len, instructions: instructions.slice(0, len) });

  try {
    const resultPretty = await prettierJs({ code: result, toThrow: true });
    console.log("Code successfully prettified");
    return { result, resultPretty, len };
  } catch (error) {
    console.error("Error while prettifying code:", error);
    return { result: code, len: 0 };
  }
};

Object.assign(globalThis, { updateSearchReplace });
console.log("chat-utils.worker.ts initialization complete");
