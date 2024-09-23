import type Env from "./env";
import { makeSession, ICodeSession, createPatch, CodePatch } from "@spike-land/code";

const chunked = (counter: number): string => {
    const res: number[] = [];
    while (counter > 100) {
        res.push(counter % 100);
        counter = Math.floor(counter / 100);
    }
    res.push(counter);
    return res.reverse().join("/");
};

const getX = (env: Env) => async (codeSpace: string, counter: number): Promise<ICodeSession | null> => {
    try {
        const response = await env.X9.get(`${codeSpace}/${chunked(counter)}`);
        return response ? await response.json() : null;
    } catch (error) {
        console.error(`Error retrieving data for ${codeSpace}/${counter}:`, error);
        return null;
    }
};

const saveX = (env: Env) => async (codeSpace: string, counter: number, data: unknown): Promise<void> => {
    try {
        await env.X9.put(`${codeSpace}/${chunked(counter)}`, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving data for ${codeSpace}/${counter}:`, error);
    }
};

const cache = new Map<string, ICodeSession>();

export const logCodeSpace = (env: Env) => async (sess: ICodeSession): Promise<void> => {
    if (cache.has(sess.codeSpace)) return;

    const s = makeSession(sess);
    cache.set(s.codeSpace, s);

    const getVal = getX(env);
    const saveVal = saveX(env);

    try {
        await saveVal(s.codeSpace, s.counter, s);

        const oldSess = cache.get(`${s.codeSpace}/${s.counter - 1}`) || await getVal(s.codeSpace, s.counter - 1);
        if (oldSess) {
            const patch: CodePatch = createPatch(oldSess, s);

            if (oldSess.counter % 10 === 0) {
                saveVal(oldSess.codeSpace, oldSess.counter, { ...oldSess, ...patch });
            } else {
                saveVal(oldSess.codeSpace, oldSess.counter, patch);
            }
        }
    } catch (error) {
        console.error(`Error in logCodeSpace for ${s.codeSpace}:`, error);
    }
};