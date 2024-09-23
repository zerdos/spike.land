import type Env from "./env";
import { makeSession, ICodeSession, createPatch, CodePatch, makeHash } from "@spike-land/code";

const chunked = (counter: number): string => {
    const res: number[] = [];
    while (counter > 100) {
        res.push(counter % 100);
        counter = Math.floor(counter / 100);
    }
    res.push(counter);
    return res.reverse().join("/");
};

const getX = (env: Env) => async (key: string): Promise<any | null> => {
    try {
        const object = await env.X9.get(key);
        if (!object) {
            return null;
        }
        const text = await object.text();
        return JSON.parse(text);
    } catch (error) {
        console.error(`Error retrieving data for ${key}:`, error);
        return null;
    }
};

const saveX = (env: Env) => async (key: string, data: unknown): Promise<void> => {
    try {
        const body = JSON.stringify(data);
         env.X9.put(key, body);
    } catch (error) {
        console.error(`Error saving data for ${key}:`, error);
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
        // Get the previous session
        const prevKey = `${s.codeSpace}/${chunked(s.counter - 1)}`;
        const prevSess = await getVal(prevKey);

        // Save the current session
        const currentKey = `${s.codeSpace}/${chunked(s.counter)}`;
         saveVal(currentKey, s);

        // Save the current session to its hash key
        const hashKey = makeHash(s);
         saveVal(hashKey, s);

        if (prevSess) {
            // Create and save the patch
            const patch: CodePatch = createPatch(prevSess, s);
            const prevHashKey = makeHash(prevSess);
             saveVal(prevHashKey, {
                prevHash: makeHash(prevSess),
                nextHash: hashKey,
                patch: patch
            });
        }
    } catch (error) {
        console.error(`Error in logCodeSpace for ${s.codeSpace}:`, error);
    }
};