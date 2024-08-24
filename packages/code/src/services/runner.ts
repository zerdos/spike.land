import { cSess } from "@src/ws";
export const runner = async (code: string) => {
  return cSess.setCode(code);
};
