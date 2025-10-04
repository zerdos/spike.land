import type { ICodeSession } from "@/lib/interfaces";
import { sanitizeSession } from "@/lib/make-sess";
import { md5 } from "@/lib/md5";
import { connect } from "@/lib/shared";
import type { ILogger } from "./interfaces/ILogger";
import type { IStorageWrapper } from "./interfaces/IDependencyWrapper";
import type { ISessionManager } from "./ISessionManager";
import { SessionSynchronizer } from "./SessionSynchronizer";

/**
 * Dependencies for SessionManager with dependency injection
 */
export interface SessionManagerDependencies {
  /** Logger instance for structured logging */
  logger: ILogger;
  /** Storage wrapper for localStorage access */
  storage: IStorageWrapper;
}

/**
 * SessionManager is responsible for managing the session state and synchronizing it across clients.
 *
 * Refactored to use dependency injection for better testability and flexibility.
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
  private readonly logger: ILogger;
  private readonly storage: IStorageWrapper;
  private sessionSynchronizer: SessionSynchronizer;
  private releaseWorker = () => {};

  constructor(
    private readonly codeSpace: string,
    dependencies: SessionManagerDependencies,
  ) {
    this.logger = dependencies.logger;
    this.storage = dependencies.storage;

    // Initialize user ID
    this.user = "";
    this.initializeUser().catch((error) => {
      this.logger.error("Failed to initialize user", error);
    });

    // Setup session synchronizer to communicate with other tabs/windows
    this.sessionSynchronizer = new SessionSynchronizer(codeSpace);
    this.sessionSynchronizer.subscribe((session) => {
      this.session = session;
    });
  }

  /**
   * Initialize user ID from storage
   * @private
   */
  private async initializeUser(): Promise<void> {
    const userKey = `${this.codeSpace} user`;
    const storedUser = await this.storage.getItem(userKey);

    if (storedUser) {
      this.user = storedUser;
    } else {
      this.user = md5(crypto.randomUUID());
      await this.storage.setItem(userKey, this.user);
    }

    this.logger.debug("User initialized", { user: this.user, codeSpace: this.codeSpace });
  }

  async init(initialSession?: ICodeSession): Promise<ICodeSession> {
    const { ErrorCode, StorageError } = await import("@/lib/errors");

    this.session = await this.sessionSynchronizer.init(initialSession);

    if (this.session) {
      const session = this.session!;

      this.releaseWorker = await connect({
        signal: `${this.user} ${session.codeSpace}`,
        sess: session,
      });
    }
    if (!this.session) {
      throw new StorageError(
        "Session initialization failed",
        ErrorCode.INITIALIZATION_FAILED,
        "session",
      );
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

    return diff;
  }

  private broadcastSession(oldSession: ICodeSession): void {
    this.logger.debug("SessionManager Broadcasting session", { session: this.session });
    if (!this.session) return;

    const diff = this.computeSessionDiff(oldSession, this.session);

    // Only broadcast if there are actual changes beyond just codeSpace
    if (Object.keys(diff).length > 1) {
      const broadcastData = {
        code: this.session.code,
        html: this.session.html,
        css: this.session.css,
        codeSpace: this.session.codeSpace,
        transpiled: this.session.transpiled,
        messages: this.session.messages,
        sender: this.user,
      };

      this.sessionSynchronizer.broadcastSession(broadcastData);
      this.logger.debug("Session broadcast complete", {
        changedFields: Object.keys(diff).length
      });
    }
  }

  async release(): Promise<void> {
    this.releaseWorker();
    this.sessionSynchronizer.close();
  }
}
