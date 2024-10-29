import type { ICodeSession } from "@/lib/interfaces";
import { makeSession } from "@/lib/make-sess";

const origin = location.origin.includes("localhost") ? "" : location.origin;

export class CodeSessionBC {
  private broadcastChannel: BroadcastChannel;
  session: ICodeSession | null = null;
  subscribers: Array<(session: ICodeSession) => void> = [];

  constructor(private codeSpace: string) {
    this.broadcastChannel = new BroadcastChannel(
      `${location.origin}/live/${this.codeSpace}/`,
    );
    this.broadcastChannel.onmessage = (
      { data }: MessageEvent<ICodeSession>,
    ) => {
      {
        if (data.i) {
          if (!this.session) {
            this.session = makeSession(data);

            this.subscribers.forEach((cb) => cb(this.session!));
          }

          if (this.session && data.i > this.session.i) {
            // console.log("broadcastChannel.onmessage", data);

            this.session = makeSession(data);

            this.subscribers.forEach((cb) => cb(this.session!));
          }
        }
      }
    };
  }

  async setCodeAndTranspiled({
    formatted,
    transpiled,
  }: {
    formatted: string;
    transpiled: string;
  }): Promise<boolean> {
    if (!this.session) {
      this.session = await this.init();
    }
    this.session = {
      ...this.session,
      code: formatted,
      transpiled,
      i: this.session.i + 1,
    };
    this.postMessage(this.session);
    return true;
  }

  async getCode() {
    if (!this.session) {
      this.session = await this.init();
    }
    return this.session.code;
  }

  async init(session: ICodeSession | null = null): Promise<ICodeSession> {
    return this.session = session || this.session ||
      (await fetch(`${origin}/live/${this.codeSpace}/session.json`).then((
        response,
      ) => response.json())) as ICodeSession;
  }

  sub(callback: (session: ICodeSession) => void): void {
    this.subscribers.push(callback);
  }
  postMessage(session: ICodeSession): void {
    this.subscribers.forEach((cb) => {
      try {
        cb(session);
      } catch (error) {
        console.error("Error in CodeSessionBC.postMessage", error);
      }
    });
    this.broadcastChannel.postMessage(session);
  }
  close(): void {
    this.broadcastChannel.close();
  }
}
