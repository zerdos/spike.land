import { getBroadcastChannel } from "@/lib/broadcast-channel";
import { ICodeSession } from "@/lib/interfaces";
import { sanitizeSession } from "@/lib/make-sess";
import { ISessionSynchronizer } from "./types";

/**
 * SessionSynchronizer enables cross-tab communication for code sessions
 * using the BroadcastChannel API.
 * 
 * This class is responsible for:
 * 1. Synchronizing session state across multiple browser tabs/windows
 * 2. Broadcasting session updates to all connected clients
 * 3. Notifying subscribers of session changes
 */
export class SessionSynchronizer implements ISessionSynchronizer {
  private broadcastChannel: BroadcastChannel;
  private session: ICodeSession | null = null;
  private subscribers: Array<(session: ICodeSession) => void> = [];

  /**
   * Creates a new SessionSynchronizer for the specified code space
   * 
   * @param codeSpace - The identifier for the code space to synchronize
   * @param session - Optional initial session data
   */
  constructor(private codeSpace: string, session?: ICodeSession) {
    if (session) {
      this.session = session;
    }

    // Create a broadcast channel for this code space
    this.broadcastChannel = getBroadcastChannel(this.codeSpace);

    // Set up message handler for incoming session updates
    this.broadcastChannel.onmessage = (
      { data }: MessageEvent<ICodeSession>,
    ) => {
      try {
        if (!this.session) {
          this.session = sanitizeSession(data);
        } else {
          // Create a new session object with proper merging
          const newSession = sanitizeSession({
            ...this.session,
            ...data,
            // Special handling for messages array to prevent overwriting
            messages: data.messages ? 
              // If data contains messages, use them (they should be complete)
              [...data.messages] : 
              // Otherwise keep existing messages
              [...this.session.messages],
          });
          
          this.session = newSession;
        }

        // Notify all subscribers with a copy of the session
        this.notifySubscribers(this.session);
      } catch (error) {
        console.error("Error in SessionSynchronizer message handler:", error);
      }
    };
  }

  /**
   * Notifies all subscribers with the current session
   * 
   * @param session - The session to notify subscribers with
   * @private
   */
  private notifySubscribers(session: ICodeSession): void {
    this.subscribers.forEach((cb) => {
      try {
        cb(session);
      } catch (error) {
        console.error("Error notifying subscriber:", error);
      }
    });
  }

  /**
   * Gets the current code from the session
   * 
   * @returns Promise resolving to the current code
   */
  async getCode(): Promise<string> {
    if (!this.session) {
      this.session = await this.init();
    }
    return this.session.code;
  }

  /**
   * Gets the current session
   * 
   * @returns The current session or null if not initialized
   */
  getSession(): ICodeSession | null {
    return this.session;
  }

  /**
   * Initializes the session, either with provided data or by fetching from the server
   * 
   * @param session - Optional session data to initialize with
   * @returns Promise resolving to the initialized session
   */
  async init(session?: ICodeSession): Promise<ICodeSession> {
    try {
      if (session) {
        this.session = sanitizeSession(session);
        return this.session;
      }
      
      if (this.session) {
        return this.session;
      }
      
      const response = await fetch(`/live/${this.codeSpace}/session.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch session: ${response.status}`);
      }
      
      const data = await response.json();
      this.session = sanitizeSession(data);
      return this.session;
    } catch (error) {
      console.error("Error initializing session:", error);
      // Create a minimal valid session if fetch fails
      this.session = sanitizeSession({
        codeSpace: this.codeSpace,
        code: "",
        html: "",
        css: "",
        transpiled: "",
        messages: [],
      });
      return this.session;
    }
  }

  /**
   * Subscribes to session updates
   * 
   * @param callback - Function to call when session changes
   * @returns Unsubscribe function
   */
  subscribe(callback: (session: ICodeSession) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  /**
   * Broadcasts a session update to all connected clients
   * 
   * @param session - Session data to broadcast
   */
  broadcastSession(session: ICodeSession & {sender: string}): void {
    console.log("Broadcasting session", session);
    try {
      // First update our local session
      const sanitizedSession = sanitizeSession(session);
      this.session = sanitizedSession;
      
      // Then broadcast to other tabs
      this.broadcastChannel.postMessage(sanitizedSession);
      
      // Finally notify our subscribers
      this.notifySubscribers(sanitizedSession);
    } catch (error) {
      console.error("Error in SessionSynchronizer.broadcastSession", error);
    }
  }

  /**
   * Closes the broadcast channel and cleans up resources
   */
  close(): void {
    try {
      this.broadcastChannel.close();
      this.subscribers = [];
      
    } catch (error) {
      console.error("Error closing broadcast channel:", error);
    }
  }
}
