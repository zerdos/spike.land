import { ICodeSession } from "@/lib/interfaces";
import { makeSession } from "@/lib/make-sess";

export class CodeSessionBC {
  private broadcastChannel: BroadcastChannel;
  session: ICodeSession | null = null;
  subscribers: Array<(session: ICodeSession) => void> = [];

  constructor(private codeSpace: string) {
    this.broadcastChannel = new BroadcastChannel(`${location.origin}/live/${this.codeSpace}/`);
    this.broadcastChannel.onmessage = ({ data }: MessageEvent<ICodeSession>) => {
      {
        if (data.i) {
          if (!this.session) {
            this.session = makeSession(data);

            this.subscribers.forEach(cb => cb(this.session!));
          }

          if (this.session && data.i > this.session.i) {
            console.log("broadcastChannel.onmessage", data);

            this.session = makeSession(data);

            this.subscribers.forEach(cb => cb(this.session!));
          }
        }
      }
    };
  }
  async init(): Promise<ICodeSession> {
    return this.session = this.session
      || (await fetch(`/live/${this.codeSpace}/session.json`).then(response => response.json())) as ICodeSession;
  }

  sub(callback: (session: ICodeSession) => void): void {
    this.subscribers.push(callback);
  }
  postMessage(session: ICodeSession): void {
    this.broadcastChannel.postMessage(session);
  }
  close(): void {
    this.broadcastChannel.close();
  }
}
