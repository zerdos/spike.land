import { ICodeSession } from "@/lib/interfaces";
import { makeSession } from "@/lib/make-sess";

export class CodeSessionBC {
  private broadcastChannel: BroadcastChannel;
  session: ICodeSession | null = null;

  constructor(private codeSpace: string) {
    this.broadcastChannel = new BroadcastChannel(`${location.origin}/live/${this.codeSpace}/`);
  }
  async init(): Promise<ICodeSession> {
    return this.session = this.session
      || (await fetch(`/live/${this.codeSpace}/session.json`).then(response => response.json())) as ICodeSession;
  }
  sub(callback: (session: ICodeSession) => void): void {
    this.broadcastChannel.onmessage = ({ data }: MessageEvent<ICodeSession>) => {
      {
        if (data.i) {
          if (!this.session) {
            this.session = data;
            callback(data);
          }

          if (this.session && data.i > this.session.i) {
            console.log("broadcastChannel.onmessage", data);

            this.session = makeSession(data);

            callback(this.session);
          }
        }
      }
    };
  }
  postMessage(session: ICodeSession): void {
    this.broadcastChannel.postMessage(session);
  }
  close(): void {
    this.broadcastChannel.close();
  }
}
