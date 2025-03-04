import type { ICodeSession, Message } from "@/lib/interfaces";

export interface ISessionManager {
  /**
   * Initialize the session
   * @param initialSession Optional initial session data
   */
  init(initialSession?: ICodeSession): Promise<ICodeSession>;

  /**
   * Add a message chunk to the current session
   * @param chunk Message content to add
   */
  addMessageChunk(chunk: string): void;

  /**
   * Add a new message to the session
   * @param newMessage Message to add
   * @returns true if message was added, false if no changes
   */
  addMessage(newMessage: Message): boolean;

  /**
   * Remove all messages from the session
   * @returns true if messages were removed, false if no changes
   */
  removeMessages(): boolean;

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
