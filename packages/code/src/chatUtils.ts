import { updateSearchReplace as up } from "@/lib/chat-utils";

export const updateSearchReplace = async (
  instructions: string,
  code: string,
  prettierJs: (code: string) => Promise<string>,
) => {
  console.log("instructions", instructions);
  console.log("code", code);

  const stringReplaced = await prettierJs(up(instructions, code));

  return stringReplaced;
};

Object.assign(self, { updateSearchReplace });
