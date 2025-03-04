import type { ICodeSession, Message } from "@/lib/interfaces";
import { sanitizeSession } from "@/lib/make-sess";
import { md5 } from "@/lib/md5";
import { CodeSessionBC } from "../CodeSessionBc";
import type { ISessionManager } from "../interfaces/ISessionManager";
import { messagesPush } from "@/lib/chat-utils";
interface BroadcastMessage extends ICodeSession {
  sender: string;
}

export class SessionManager implements ISessionManager {
  private session: ICodeSession | null = null;
  private user: string;
  private broadcastChannel: CodeSessionBC;

  constructor(codeSpace: string) {
    // Determine the user ID (anonymous hashing if needed)
    this.user = localStorage.getItem(`${codeSpace} user`) ||
      md5(crypto.randomUUID());
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
    if (!this.session) return;

    const oldSession = sanitizeSession(this.session);
    if (this.session.messages.length === 0) {
      this.addMessage({
        id: Date.now().toString(),
        role: "assistant",
        content: chunk,
      });
      return;
    }

    const lastMessage = this.session.messages[this.session.messages.length - 1];
    if (lastMessage.role !== "assistant") {
      this.addMessage({
        id: Date.now().toString(),
        role: "assistant",
        content: chunk,
      });
      return;
    }

    lastMessage.content += chunk;
    const newSession = sanitizeSession({...this.session, messages: [
      ...this.session.messages.slice(0, this.session.messages.length - 1),
      lastMessage,
    ]}); 

    this.session = newSession;  
    this.broadcastSession(oldSession);
  }

  addMessage(newMessage: Message): boolean {
    if (!this.session) return false;
    
    const oldSession = sanitizeSession(this.session);
    const currentMessages = this.session.messages;
    
    // Use messagesPush to add the new message following the rules
    const updatedMessages = messagesPush(currentMessages, newMessage);
    
    // Check if messages actually changed
    if (md5(JSON.stringify(updatedMessages)) === md5(JSON.stringify(currentMessages))) {
      return false;
    }
    
    this.session = sanitizeSession({
      ...this.session,
      messages: updatedMessages,
    });
    
    this.broadcastSession(oldSession);
    return true;
  }
  
  removeMessages(): boolean {
    if (!this.session) return false;
    
    // If there are no messages, nothing to remove
    if (this.session.messages.length === 0) return false;
    
    const oldSession = sanitizeSession(this.session);
    
    this.session = sanitizeSession({
      ...this.session,
      messages: [],
    });
    
    this.broadcastSession(oldSession);
    return true;
  }

  subscribe(callback: (session: ICodeSession) => void): () => void {
    return this.broadcastChannel.sub(callback);
  }

  getSession(): ICodeSession {
    if (!this.session) {
      throw new Error("Session not initialized");
    }
    return this.session;
  }

  updateSession(sessionData: Partial<ICodeSession>): void {
    if (!this.session) return;
    const oldSession = sanitizeSession(this.session);
    const newSession = sanitizeSession({
      ...this.session,
      ...sessionData,
    });
    if (md5(JSON.stringify(newSession)) === md5(JSON.stringify(this.session))) {
      return;
    }
    this.session = newSession;
    this.broadcastSession(oldSession);
  }

  /**
   * Computes the difference between two sessions, returning only changed fields
   */
  private computeSessionDiff(
    oldSession: ICodeSession,
    newSession: ICodeSession,
  ): Partial<ICodeSession> {
    const diff: Partial<ICodeSession> = {
      codeSpace: newSession.codeSpace,
    };

    // Compare simple fields
    if (oldSession.code !== newSession.code) {
      diff.code = newSession.code;
    }
    if (oldSession.html !== newSession.html) {
      diff.html = newSession.html;
    }
    if (oldSession.css !== newSession.css) {
      diff.css = newSession.css;
    }
    if (oldSession.transpiled !== newSession.transpiled) {
      diff.transpiled = newSession.transpiled;
    }

    // Compare messages with optimized diffing
    if (
      JSON.stringify(oldSession.messages) !==
        JSON.stringify(newSession.messages)
    ) {
      if (newSession.messages.length === 0) {
        diff.messages = [];
      } else if (oldSession.messages.length === newSession.messages.length) {
        // If same length, only send the modified message (usually the last one)
        const lastIndex = newSession.messages.length - 1;
        if (
          JSON.stringify(oldSession.messages[lastIndex]) !==
            JSON.stringify(newSession.messages[lastIndex])
        ) {
          diff.messages = [newSession.messages[lastIndex]];
        }
      } else {
        // If message count changed, only send the new messages
        diff.messages = newSession.messages.slice(oldSession.messages.length);
      }
    }

    return diff;
  }

  private broadcastSession(oldSession: ICodeSession): void {
    if (
      !this
        .session
    ) return;

    const diff = this.computeSessionDiff(oldSession, this.session);

    // Only broadcast if there are actual changes beyond just codeSpace
    if (Object.keys(diff).length > 1) {
      const broadcastData: BroadcastMessage = {
        code: this.session.code,
        html: this.session.html,
        css: this.session.css,
        messages: diff.messages || this.session.messages,
        codeSpace: this.session.codeSpace,
        transpiled: this.session.transpiled,
        sender: "Editor",
      };

      this.broadcastChannel.postMessage(broadcastData);
    }
  }

  async release(): Promise<void> {
    this.broadcastChannel.close();
  }
}
