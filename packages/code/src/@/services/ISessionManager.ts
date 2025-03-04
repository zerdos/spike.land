import type { ICodeSession } from "@/lib/interfaces";

/**
 * Interface for session management operations
 *
 * Note: Message-related operations (addMessageChunk, addMessage, removeMessages) have been moved
 * to the Code class for better coordination with code updates.
 */
export interface ISessionManager {
  /**
   * Initialize the session
   * @param initialSession Optional initial session data
   */
  init(initialSession?: ICodeSession): Promise<ICodeSession>;

  /**
   * Subscribe to session changes
   * @param callback Function to call when session changes
   * @returns Unsubscribe function
   */
  subscribe(callback: (session: ICodeSession) => void): () => void;

  /**
   * Get the current session
   */
  getSession(): ICodeSession;

  /**
   * Update the session and broadcast changes
   * @param sessionData Updated session data
   */
  updateSession(sessionData: Partial<ICodeSession>): void;

  /**
   * Clean up resources
   */
  release(): Promise<void>;
}
