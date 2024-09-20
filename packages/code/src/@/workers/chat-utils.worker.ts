import { updateSearchReplace as up } from "@/lib/chat-utils";

export const updateSearchReplace = async (
  instructions: string,
  code: string,
) => {
  console.log("instructions", instructions);
  console.log("code", code);

  const result = up(instructions, code);
  const resultBad = up(instructions + "\nfooo\n", code);
  if (result !== resultBad) {
    return code;
  }

  return result;
};

Object.assign(globalThis, { updateSearchReplace });
