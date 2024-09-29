import { updateSearchReplace as up } from "@/lib/chat-utils";

export const updateSearchReplace = async (
  { instructions, code }: { instructions: string; code: string },
) => {
  console.log("instructions", instructions);
  console.log("code", code);

  const result = up({ codeNow: instructions, oldCode: code });
  const resultBad = up({ codeNow: instructions + "\nfooo\n", oldCode: code });
  if (result !== resultBad) {
    return code;
  }

  return result;
};

Object.assign(globalThis, { updateSearchReplace });
