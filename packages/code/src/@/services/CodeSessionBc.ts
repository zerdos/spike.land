import { getBroadcastChannel } from "@/lib/broadcast-channel";
import { sanitizeSession } from "@/lib/make-sess";
import { ICodeSession } from "@/lib/interfaces";
import { ICodeSessionBC } from "./types";

export class CodeSessionBC implements ICodeSessionBC {
  private broadcastChannel: BroadcastChannel;
  session: ICodeSession | null = null;
  subscribers: Array<(session: ICodeSession) => void> = [];

  constructor(private codeSpace: string, session?: ICodeSession) {
    if (session) {
      this.session = session;
    }

    this.broadcastChannel = getBroadcastChannel(this.codeSpace);

    this.broadcastChannel.onmessage = (
      { data }: MessageEvent<ICodeSession>,
    ) => {
      if (!this.session) {
        this.session = sanitizeSession(data);
      }

      // console.log("broadcastChannel.onmessage", data);

      const newSession = this.session = sanitizeSession({
        ...this.session,
        ...data,
      });

      this.subscribers.forEach((cb) => cb(newSession));
    };
  }

  async getCode() {
    if (!this.session) {
      this.session = await this.init();
    }
    return this.session.code;
  }

  async init(session?: ICodeSession): Promise<ICodeSession> {
    return this.session = session || this.session ||
      (await fetch(`/live/${this.codeSpace}/session.json`).then((
        response,
      ) => response.json())) as ICodeSession;
  }

  sub(callback: (session: ICodeSession) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
      return;
    };
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
