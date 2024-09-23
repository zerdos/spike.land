import { ICode, ICodeSession, ImageData } from "@/lib/interfaces";

class SessMock implements ICode {
  buffy: Promise<void>[] = [];
  codeSpace: string = "mock-code-space";

  private subs: ((sess: ICodeSession) => void)[] = [];

  session: ICodeSession = {
    code: "",
    codeSpace: "",
    html: "",
    i: 34,
    transpiled: "",
    css: "",
  };

  init: () => Promise<ICodeSession> = async () => {
    return this.session;
  };

  sub(fn: (sess: ICodeSession) => void) {
    this.subs.push(fn);
  }

  broadCastSessChanged() {
    this.subs.forEach(cb => cb(this.session));
  }

  async setCode(rawCode: string): Promise<string> {
    this.session.code = rawCode;
    this.session.i++;

    this.broadCastSessChanged();
    return rawCode;
  }

  async screenShot(): Promise<ImageData> {
    return {
      imageName: "mock-screenshot.png",
      url: "https://example.com/mock-screenshot.png",
      src: "data:image/png;base64,mockedBase64Data",
      mediaType: "image/png",
      data: "mockedBase64Data",
      type: "image/png",
    };
  }

  async currentCodeWithExtraModels(): Promise<string> {
    // Mock implementation
    return this.session.code;
  }

  async setModelsByCurrentCode(code: string): Promise<string> {
    // Mock implementation
    this.session.code = code;
    this.broadCastSessChanged();
    return code;
  }
}

export const cSessMock = new SessMock();
