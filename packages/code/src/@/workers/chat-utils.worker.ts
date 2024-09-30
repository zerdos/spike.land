import { updateSearchReplace as up } from "@/lib/chat-utils";
import type { prettierJs as prettier } from "@/lib/prettier";
importScripts("/@/workers/prettier-esm.worker.js");

console.log("chat-utils.worker.ts loaded");

const prettierJs = (globalThis as unknown as { prettierJs: typeof prettier }).prettierJs;

console.log("prettierJs function imported:", prettierJs);

export const updateSearchReplace = async (
  { instructions, code }: { instructions: string; code: string },
) => {
  console.log("updateSearchReplace function called");
  console.log("Received instructions:", { instructions });
  console.log("Received code:", { code });

  const result = up(instructions, code);
  // console.log("Result after up(instructions, code):", result);

  const resultBad = up(instructions + "\nfooo\n", code);
  // console.log("Result after up(instructions + '\\nfooo\\n', code):", resultBad);

  if (result !== resultBad) {
    console.log("result !== resultBad, returning original code");

    return code;
  }
  if (result === code) {
    console.log("result === code, returning original code");
    return code;
  }

  console.log("Attempting to prettify the code");

  try {
    const resultPretty = await prettierJs({ code, toThrow: true });
    console.log("Code successfully prettified");
    return resultPretty;
  } catch (error) {
    console.error("Error while prettifying code:", error);
    return code;
  }
};

console.log("Assigning updateSearchReplace to globalThis");
Object.assign(globalThis, { updateSearchReplace });
console.log("chat-utils.worker.ts initialization complete");
