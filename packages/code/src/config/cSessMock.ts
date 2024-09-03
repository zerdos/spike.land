import { ICodeSession } from "@/lib/interfaces";
import { ICode } from "@src/cSess.interface";

class SessMock implements ICode {
  buffy: Promise<void>[] = [];
  codeSpace: string = "mock-code-space";

  private subs: ((sess: ICodeSession) => void)[] = [];

  session: ICodeSession = {
    code: "",
    html: "",
    i: 34,
    transpiled: "",
    css: "",
  };

  sub(fn: (sess: ICodeSession) => void) {
    this.subs.push(fn);
  }

  broadCastSessChanged() {
    this.subs.forEach(cb => cb(this.session));
  }

  async setCode(rawCode: string) {
    this.session.code = rawCode;
    this.session.i++;

    this.broadCastSessChanged();
    return rawCode;
  }
}

export const cSessMock = new SessMock();
