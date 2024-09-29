import { updateSearchReplace as up } from "@/lib/chat-utils";

export const updateSearchReplace = async (
  { instructions, code }: { instructions: string; code: string },
) => {
  console.log("instructions", instructions);
  console.log("code", code);

  const result = up({ codeNow: code, oldCode: instructions });
  const resultBad = up({ codeNow: code, oldCode: instructions + "\nfooo\n" });
  if (result !== resultBad) {
    return code;
  }

  return result;
};

Object.assign(globalThis, { updateSearchReplace });
