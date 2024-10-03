import type Env from "./env";
import type { ICodeSession } from "@spike-land/code";
import {
  makeSession,
  makeHash,
  createPatch,
  applyCodePatch,
  CodePatch,
} from "@spike-land/code";

export interface CodeHistoryEntry {
  timestamp: number;
  hash: string;
  patch?: CodePatch;
}

export class CodeHistoryManager {
  private env: Env;
  private cache: Map<string, ICodeSession>;
  private historyCache: Map<string, CodeHistoryEntry[]>;

  constructor(env: Env) {
    this.env = env;
    this.cache = new Map<string, ICodeSession>();
    this.historyCache = new Map<string, CodeHistoryEntry[]>();
  }

  private async getFromStorage(key: string): Promise<any | null> {
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

  async logCodeSpace(sess: ICodeSession): Promise<void> {
    const s = makeSession(sess);
    const oldSess =
      this.cache.get(s.codeSpace) || (await this.getFromStorage(s.codeSpace));
    const isFirstTime = !oldSess;

    if (!isFirstTime && makeHash(oldSess) === makeHash(s)) {
      return; // No changes
    }

    this.cache.set(s.codeSpace, s);

    try {
      const historyEntry: CodeHistoryEntry = {
        timestamp: Date.now(),
        hash: makeHash(s),
      };

      if (isFirstTime) {
        // First time: save the full session under codeSpace
        await this.saveToStorage(s.codeSpace, s);
      } else {
        // Subsequent changes: store only the patch
        historyEntry.patch = createPatch(oldSess, s);
      }

      await this.appendToHistory(s.codeSpace, historyEntry);
    } catch (error) {
      console.error(`Error in logCodeSpace for ${s.codeSpace}:`, error);
    }
  }

  private async appendToHistory(
    codeSpace: string,
    entry: CodeHistoryEntry
  ): Promise<void> {
    const historyKey = `${codeSpace}:history`;
    let history = this.historyCache.get(codeSpace);

    if (!history) {
      history =  (await this.getFromStorage(historyKey)) || [];
      this.historyCache.set(codeSpace, history!);
    }

    history!.push(entry);
    await this.saveToStorage(historyKey, history);
  }

  async getHistory(codeSpace: string): Promise<CodeHistoryEntry[]> {
    const historyKey = `${codeSpace}:history`;
    if (this.historyCache.has(codeSpace)) {
      return this.historyCache.get(codeSpace)!;
    }
    const history = (await this.getFromStorage(historyKey)) || [];
    this.historyCache.set(codeSpace, history);
    return history;
  }

  async getSessionAtTimestamp(
    codeSpace: string,
    timestamp: number
  ): Promise<ICodeSession | null> {
    try {
      let targetSession = this.cache.get(`${codeSpace}:initial`);

      if (!targetSession) {
        targetSession = await this.getFromStorage(codeSpace);
        if (!targetSession) {
          return null;
        }
        this.cache.set(`${codeSpace}:initial`, targetSession);
      }

      const history = await this.getHistory(codeSpace);
      for (const entry of history) {
        if (entry.timestamp > timestamp) {
          break;
        }
        if (entry.patch) {
          targetSession = applyCodePatch(targetSession, entry.patch);
        } else if (entry.hash !== makeHash(targetSession)) {
          // Handle inconsistency
          console.warn(`Hash mismatch at timestamp ${entry.timestamp}`);
          return null;
        }
      }

      // Update cache for subsequent operations
      this.cache.set(codeSpace, targetSession);
      return targetSession;
    } catch (error) {
      console.error(
        `Error retrieving session at timestamp ${timestamp} for ${codeSpace}:`,
        error
      );
      return null;
    }
  }

  async revertToTimestamp(
    codeSpace: string,
    timestamp: number
  ): Promise<ICodeSession | null> {
    const session = await this.getSessionAtTimestamp(codeSpace, timestamp);
    if (session) {
      await this.logCodeSpace(session);
    }
    return session;
  }

  // Cleanup mechanism to remove old history entries beyond a certain limit
  async cleanupHistory(codeSpace: string, maxEntries: number): Promise<void> {
    const historyKey = `${codeSpace}:history`;
    const history = await this.getHistory(codeSpace);
    if (history.length > maxEntries) {
      const trimmedHistory = history.slice(-maxEntries);
      this.historyCache.set(codeSpace, trimmedHistory);
      await this.saveToStorage(historyKey, trimmedHistory);
    }
  }
}

export const createCodeHistoryManager = (env: Env): CodeHistoryManager => {
  return new CodeHistoryManager(env);
};
