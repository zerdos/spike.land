import type { ICode, ICodeSession, ImageData, Message } from "@/lib/interfaces";

class SessMock implements ICode {
  codeSpace = "mock-code-space";

  private subs: Array<(sess: ICodeSession) => void> = [];

  private session: ICodeSession = {
    code: "",
    codeSpace: "",
    html: "",
    messages: [],
    transpiled: "",
    css: "",
  };

  getSession = async (): Promise<ICodeSession> => this.session;
  
  setSession = async (sess: ICodeSession): Promise<void> => {
    this.session = sess;
    this.broadCastSessChanged();
  };

  init: () => Promise<ICodeSession> = async () => {
    return this.session;
  };

  sub(fn: (sess: ICodeSession) => void) {
    this.subs.push(fn);
    return () => {
      this.subs = this.subs.filter((f) => f !== fn);
    };
  }

  addMessageChunk(chunk: string) {
    const message: Message = {
      id: "mock-id",
      role: "user",
      content: chunk,
    };
    this.session.messages.push(message);
    this.broadCastSessChanged();
  }

  setMessages(messages: Message[]) {
    this.session.messages = messages;
    return true;
  }

  broadCastSessChanged() {
    this.subs.forEach((cb) => cb(this.session));
  }

  async setCode(rawCode: string): Promise<string> {
    this.session.code = rawCode;
    this.broadCastSessChanged();
    return rawCode;
  }

  async screenshot(): Promise<ImageData> {
    return {
      imageName: "mock-screenshot.png",
      url: "https://example.com/mock-screenshot.png",
      src: "data:image/png;base64,mockedBase64Data",
      mediaType: "image/png",
      data: "mockedBase64Data",
      type: "image/png",
    };
  }

  async getCode(): Promise<string> {
    return this.session.code;
  }

  getMessages = () => this.session.messages;
}

export const cSessMock = new SessMock();
