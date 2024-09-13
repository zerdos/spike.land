import { updateSearchReplace as up } from "@/lib/chat-utils";

export const updateSearchReplace = async (
  instructions: string,
  code: string,
) => {
  console.log("instructions", instructions);
  console.log("code", code);

  return up(instructions, code);
};

Object.assign(self, { updateSearchReplace });
