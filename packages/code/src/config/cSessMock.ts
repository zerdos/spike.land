import { ICode } from "@src/cSess.interface";
import { ICodeSession } from "@src/makeSess";

export const cSessMock: ICode = {
  session: {
    code: "",
    html: "",
    i: 34,
    transpiled: "",
    css: "",
  },
  broadCastSessChanged: () => {
    // Add code here
  },
  setCode: async (rawCode: string) => {
    // Add code her
    return rawCode;
  },
  sub: (_fn: (sess: ICodeSession) => void) => {
    // Add code here
  },
  // Add properties or methods here
};
