import type { ICodeSession, SessionDelta } from "@spike-npm-land/code";
import {
  applySessionDelta,
  computeSessionHash,
  generateSessionPatch,
  sanitizeSession,
} from "@spike-npm-land/code";
import type Env from "./env";

export interface CodeHistoryEntry {
  timestamp: number;
  hash: string;
  patch?: SessionDelta;
  previousEntryId?: string;
}

export class CodeHistoryManager {
  private env: Env;
  private cache: Map<string, ICodeSession>;

  constructor(env: Env) {
    this.env = env;
    this.cache = new Map<string, ICodeSession>();
  }

  private async getFromStorage(key: string): Promise<ICodeSession | null> {
    try {
      const object = await this.env.X9.get(key);
      if (!object) {
        return null;
      }
      const text = await object.text();
      return JSON.parse(text);
    } catch (error) {
      console.error(`Error retrieving data for ${key}:`, error);
      return null;
    }
  }

  private async saveToStorage(key: string, data: unknown): Promise<void> {
    try {
      const body = JSON.stringify(data);
      await this.env.X9.put(key, body);
    } catch (error) {
      console.error(`Error saving data for ${key}:`, error);
    }
  }

  private generateEntryId(codeSpace: string, timestamp: number): string {
    return `${codeSpace}:history:${timestamp}`;
  }

  async logCodeSpace(sess: ICodeSession): Promise<void> {
    const s = sanitizeSession(sess);
    const codeSpace = s.codeSpace;
    const currentTimestamp = Date.now();

    const oldSession = this.cache.get(codeSpace) ||
      (await this.getLatestSession(codeSpace));
    const isFirstTime = !oldSession;

    if (
      !isFirstTime && computeSessionHash(oldSession) === computeSessionHash(s)
    ) {
      return; // No changes
    }

    this.cache.set(codeSpace, s);

    try {
      const entryId = this.generateEntryId(codeSpace, currentTimestamp);

      const historyEntry: CodeHistoryEntry = {
        timestamp: currentTimestamp,
        hash: computeSessionHash(s),
      };

      if (isFirstTime) {
        // First time: save the full session under codeSpace
        await this.saveToStorage(codeSpace, s);
      } else {
        // Subsequent changes: store only the patch
        historyEntry.patch = generateSessionPatch(oldSession, s);
        // Link to the previous entry
        const latestEntryId = await this.getLatestEntryId(codeSpace);
        historyEntry.previousEntryId = latestEntryId!;
      }

      // Save the history entry
      await this.saveToStorage(entryId, historyEntry);

      // Update the latest entry ID
      await this.saveToStorage(`${codeSpace}:latestEntryId`, entryId);
    } catch (error) {
      console.error(`Error in logCodeSpace for ${codeSpace}:`, error);
    }
  }

  private async getLatestEntryId(codeSpace: string): Promise<string | null> {
    const key = `${codeSpace}:latestEntryId`;
    return await this.getFromStorage(key);
  }

  private async getLatestSession(
    codeSpace: string,
  ): Promise<ICodeSession | null> {
    const latestEntryId = await this.getLatestEntryId(codeSpace);
    if (!latestEntryId) {
      // Return the initial session
      return await this.getFromStorage(codeSpace);
    }
    // Reconstruct the session from the latest entry
    return await this.getSessionAtEntryId(codeSpace, latestEntryId);
  }

  async getHistory(
    codeSpace: string,
    startEntryId: string | null = null,
    limit = 10,
  ): Promise<{ entries: CodeHistoryEntry[]; nextEntryId: string | null; }> {
    let entryId = startEntryId || (await this.getLatestEntryId(codeSpace));
    const entries: CodeHistoryEntry[] = [];

    while (entryId && entries.length < limit) {
      const entry: CodeHistoryEntry = await this.getFromStorage(entryId);
      if (!entry) {
        break;
      }
      entries.push(entry);
      entryId = entry.previousEntryId || null;
    }

    return {
      entries,
      nextEntryId: entryId,
    };
  }

  async getSessionAtTimestamp(
    codeSpace: string,
    timestamp: number,
  ): Promise<ICodeSession | null> {
    // Start from the latest entry and walk back until we find the entry at or before the timestamp
    let entryId = await this.getLatestEntryId(codeSpace);
    if (!entryId) {
      // No history entries, return the initial session
      return await this.getFromStorage(codeSpace);
    }

    let targetSession: ICodeSession | null = null;
    const entries: CodeHistoryEntry[] = [];

    while (entryId) {
      const entry: CodeHistoryEntry = await this.getFromStorage(entryId);
      if (!entry) {
        break;
      }
      if (entry.timestamp <= timestamp) {
        break;
      }
      entries.push(entry);
      entryId = entry.previousEntryId || null;
    }

    // Get the base session
    targetSession = entryId
      ? await this.getSessionAtEntryId(codeSpace, entryId)
      : await this.getFromStorage(codeSpace);

    if (!targetSession) {
      return null;
    }

    // Apply patches in reverse order
    for (let i = entries.length - 1; i >= 0; i--) {
      const entry = entries[i];
      if (!entry) continue;
      if (entry.patch) {
        targetSession = applySessionDelta(targetSession, {
          ...entry.patch,
          patch: entry.patch.reversePatch,
          reversePatch: entry.patch.patch,
        });
      }
    }

    return targetSession;
  }

  private async getSessionAtEntryId(
    codeSpace: string,
    entryId: string,
  ): Promise<ICodeSession | null> {
    const entries: CodeHistoryEntry[] = [];
    let currentEntryId: string | null = entryId;

    while (currentEntryId) {
      const entry: CodeHistoryEntry = await this.getFromStorage(currentEntryId);
      if (!entry) {
        break;
      }
      entries.unshift(entry); // Build the list from oldest to newest
      currentEntryId = entry.previousEntryId || null;
    }

    // Get the initial session
    let session = await this.getFromStorage(codeSpace);
    if (!session) {
      return null;
    }

    // Apply patches sequentially
    for (const entry of entries) {
      if (entry.patch) {
        session = applySessionDelta(session, entry.patch);
      }
    }

    return session;
  }

  // Load more functionality
  async loadMoreTimestamps(
    codeSpace: string,
    startEntryId: string | null = null,
    limit = 10,
  ): Promise<{ timestamps: number[]; nextEntryId: string | null; }> {
    const { entries, nextEntryId } = await this.getHistory(
      codeSpace,
      startEntryId,
      limit,
    );
    const timestamps = entries.map((entry) => entry.timestamp);
    return {
      timestamps,
      nextEntryId,
    };
  }

  async revertToTimestamp(
    codeSpace: string,
    timestamp: number,
  ): Promise<ICodeSession | null> {
    const session = await this.getSessionAtTimestamp(codeSpace, timestamp);
    if (session) {
      await this.logCodeSpace(session);
    }
    return session;
  }
}

export const createCodeHistoryManager = (env: Env): CodeHistoryManager => {
  return new CodeHistoryManager(env);
};
