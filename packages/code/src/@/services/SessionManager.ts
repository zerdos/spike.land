import type { ICodeSession, Message } from "@/lib/interfaces";
import { sanitizeSession } from "@/lib/make-sess";
import { md5 } from "@/lib/md5";
import { connect } from "@/lib/shared";
import type { ISessionManager } from "./ISessionManager";
import { SessionSynchronizer } from "./SessionSynchronizer";

/**
 * SessionManager is responsible for managing the session state and synchronizing it across clients.
 *
 * Its primary responsibilities are:
 * 1. Initializing the session
 * 2. Providing access to the current session state
 * 3. Broadcasting session updates to other clients via BroadcastChannel
 * 4. Computing diffs between session states to optimize network traffic
 */
export class SessionManager implements ISessionManager {
  private session: ICodeSession | null = null;
  private user: string;
  private sessionSynchronizer: SessionSynchronizer;
  private releaseWorker = () => {};

  constructor(codeSpace: string) {
    // Determine the user ID (anonymous hashing if needed)
    this.user = localStorage.getItem(`${codeSpace} user`) ||
      md5(crypto.randomUUID());
    localStorage.setItem(`${codeSpace} user`, this.user);

    // Setup session synchronizer to communicate with other tabs/windows
    this.sessionSynchronizer = new SessionSynchronizer(codeSpace);
    this.sessionSynchronizer.subscribe((session) => {
      this.session = session;
    });
  }

  async init(initialSession?: ICodeSession): Promise<ICodeSession> {
    this.session = await this.sessionSynchronizer.init(initialSession);

    if (this.session) {
      const session = this.session!;

      this.releaseWorker = await connect({
        signal: `${this.user} ${session.codeSpace}`,
        sess: session,
      });
    }
    if (!this.session) {
      throw new Error("Session initialization failed.");
    }
    return this.session;
  }

  subscribe(callback: (session: ICodeSession) => void): () => void {
    // Wrap the callback to handle the sender property
    return this.sessionSynchronizer.subscribe((sessionWithSender) => {
      // Pass the complete session including sender property to the callback
      // The callback can decide whether to use the sender property or not
      callback(sessionWithSender as ICodeSession);
    });
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
        const oldLastMessage = oldSession.messages[lastIndex];
        const newLastMessage = newSession.messages[lastIndex];
        if (
          oldLastMessage && newLastMessage &&
          JSON.stringify(oldLastMessage) !== JSON.stringify(newLastMessage)
        ) {
          diff.messages = [newLastMessage].filter(Boolean) as Message[];
        }
      } else {
        // If message count changed, only send the new messages
        diff.messages = newSession.messages.slice(oldSession.messages.length);
      }
    }

    return diff;
  }

  private broadcastSession(oldSession: ICodeSession): void {
    console.warn("SessionManager Broadcasting session", this.session); // Changed to console.warn
    if (!this.session) return;

    const diff = this.computeSessionDiff(oldSession, this.session);

    // Only broadcast if there are actual changes beyond just codeSpace
    if (Object.keys(diff).length > 1) {
      const broadcastData = {
        code: this.session.code,
        html: this.session.html,
        css: this.session.css,
        messages: diff.messages || this.session.messages,
        codeSpace: this.session.codeSpace,
        transpiled: this.session.transpiled,
        sender: this.user,
      };

      this.sessionSynchronizer.broadcastSession(broadcastData);
    }
  }

  async release(): Promise<void> {
    this.releaseWorker();
    this.sessionSynchronizer.close();
  }
}
