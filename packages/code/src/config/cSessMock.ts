import { ICode } from "@src/cSess.interface";
import { ICodeSession } from "@src/makeSess";

class SessMock implements ICode {
  buffy: Promise<void>[] = [];

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
  // Add properties or methods here
}

export const cSessMock = new SessMock();
