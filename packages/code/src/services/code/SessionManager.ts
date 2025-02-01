import type { ICodeSession, Message } from "@/lib/interfaces";
import { sanitizeSession } from "@/lib/make-sess";
import { md5 } from "@/lib/md5";
import { CodeSessionBC } from "../CodeSessionBc";
import type { ISessionManager } from "../interfaces/ISessionManager";

interface BroadcastMessage extends ICodeSession {
  sender: string;
}

export class SessionManager implements ISessionManager {
  private session: ICodeSession;
  private user: string;
  private broadcastChannel: CodeSessionBC;

  constructor(codeSpace: string) {
    this.session = sanitizeSession({
      code: "",
      html: "",
      css: "",
      messages: [],
      codeSpace,
      transpiled: "",
    });

    // Determine the user ID (anonymous hashing if needed)
    this.user = localStorage.getItem(`${codeSpace} user`) || md5(crypto.randomUUID());
    localStorage.setItem(`${codeSpace} user`, this.user);

    // Setup broadcast channel to synchronize with other clients
    this.broadcastChannel = new CodeSessionBC(codeSpace);
    this.broadcastChannel.sub((session) => {
      this.session = session;
    });
  }

  async init(initialSession?: ICodeSession): Promise<ICodeSession> {
    this.session = await this.broadcastChannel.init(initialSession);
    return this.session;
  }

  addMessageChunk(chunk: string): void {
    if (this.session.messages.length === 0) {
      this.setMessages([{ id: Date.now().toString(), role: "assistant", content: chunk }]);
      return;
    }

    const lastMessage = this.session.messages[this.session.messages.length - 1];
    if (lastMessage.role !== "assistant") {
      this.setMessages([
        ...this.session.messages,
        { id: Date.now().toString(), role: "assistant", content: chunk },
      ]);
      return;
    }

    lastMessage.content += chunk;
    this.broadcastSession();
  }

  setMessages(messages: Message[]): boolean {
    const currentMessages = this.session.messages;

    if (messages.length === currentMessages.length) {
      // No changes if both are empty
      if (!messages.length) return false;

      // Compare last messages, then check hashes
      if (
        messages[messages.length - 1].content ===
          currentMessages[currentMessages.length - 1].content
      ) {
        const before = md5(JSON.stringify(currentMessages));
        const after = md5(JSON.stringify(messages));
        if (before === after) return false;
      }
    }

    this.session = sanitizeSession({
      ...this.session,
      messages,
    });

    this.broadcastSession();
    return true;
  }

  subscribe(callback: (session: ICodeSession) => void): () => void {
    return this.broadcastChannel.sub(callback);
  }

  getSession(): ICodeSession {
    return this.session;
  }

  updateSession(sessionData: Partial<ICodeSession>): void {
    const newSession = sanitizeSession({
      ...this.session,
      ...sessionData,
    });
    if (md5(JSON.stringify(newSession)) === md5(JSON.stringify(this.session))) {
      return;
    }
    this.session = newSession;
    this.broadcastSession();
  }

  private broadcastSession(): void {
    this.broadcastChannel.postMessage({
      ...this.session,
      sender: "Editor",
    } as BroadcastMessage);
  }

  async release(): Promise<void> {
    this.broadcastChannel.close();
  }
}
