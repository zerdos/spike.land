import { ICodeSession } from "./makeSess";

export interface ICode {
  session: ICodeSession;

  broadCastSessChanged(): void;
  setCode(rawCode: string): Promise<string | boolean>;
}
