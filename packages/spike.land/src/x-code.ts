import type Env from "./env";
import type { ICodeSession } from "@spike-land/code";
import { makeSession, makeHash, createPatch, applyCodePatch, CodePatch } from "@spike-land/code";

export interface CodeHistoryEntry {
    timestamp: number;
    hash: string;
    patch?: CodePatch;
}

export class CodeHistoryManager {
    private env: Env;
    private cache: Map<string, ICodeSession>;

    constructor(env: Env) {
        this.env = env;
        this.cache = new Map<string, ICodeSession>();
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
        const oldSess = this.cache.get(s.codeSpace) || await this.getFromStorage(s.codeSpace);

        if (oldSess && makeHash(oldSess) === makeHash(s)) {
            return;
        }

        this.cache.set(s.codeSpace, s);

        try {
            const historyEntry: CodeHistoryEntry = {
                timestamp: Date.now(),
                hash: makeHash(s),
            };

            if (oldSess) {
                historyEntry.patch = createPatch(oldSess, s);
            }

            await this.saveToStorage(s.codeSpace, s);
            await this.saveToStorage(makeHash(s), s);
            await this.appendToHistory(s.codeSpace, historyEntry);

        } catch (error) {
            console.error(`Error in logCodeSpace for ${s.codeSpace}:`, error);
        }
    }

    private async appendToHistory(codeSpace: string, entry: CodeHistoryEntry): Promise<void> {
        const historyKey = `${codeSpace}:history`;
        const history = await this.getFromStorage(historyKey) || [];
        history.push(entry);
        await this.saveToStorage(historyKey, history);
    }

    async getHistory(codeSpace: string): Promise<CodeHistoryEntry[]> {
        const historyKey = `${codeSpace}:history`;
        return await this.getFromStorage(historyKey) || [];
    }

    async getSessionAtTimestamp(codeSpace: string, timestamp: number): Promise<ICodeSession | null> {
        const history = await this.getHistory(codeSpace);
        const currentSession = await this.getFromStorage(codeSpace);
        
        if (!currentSession || history.length === 0) {
            return null;
        }

        let targetSession = currentSession;
        for (let i = history.length - 1; i >= 0; i--) {
            const entry = history[i];
            if (entry.timestamp <= timestamp) {
                break;
            }
            if (entry.patch) {
                targetSession = applyCodePatch(targetSession, {
                    ...entry.patch,
                    patch: entry.patch.reversePatch,
                    reversePatch: entry.patch.patch,
                });
            }
        }

        return targetSession;
    }

    async revertToTimestamp(codeSpace: string, timestamp: number): Promise<ICodeSession | null> {
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