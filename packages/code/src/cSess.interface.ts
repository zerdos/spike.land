import { ICodeSession } from "./makeSess";

export interface ICode {
  session: ICodeSession;
  codeSpace: string;

  broadCastSessChanged(): void;
  setCode(rawCode: string): Promise<string | boolean>;
  sub: (fn: (sess: ICodeSession) => void) => void;
}
