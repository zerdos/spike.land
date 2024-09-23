
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
    const getVal = getX(env);
 
    const oldSess=  cache.has(sess.codeSpace) ? cache.get(sess.codeSpace) :  await getVal(sess.codeSpace); 


    const s = makeSession(sess);

    if (oldSess) {
        if (makeHash(oldSess) === makeHash(s)) {
            return;
        }
    } 
    
    
    cache.set(s.codeSpace, s);
   
    const saveVal = saveX(env);


    try {
        // Get the previous session
        // Save the current session
        await saveVal(makeHash(s), s);

        // Save the current session to its hash key
     
        await saveVal(s.codeSpace, s);
        await saveVal(makeHash(s), s);

        if (oldSess) {
            // Create and save the patch
            const patch: CodePatch = createPatch(oldSess, s);
            
            await saveVal(makeHash(oldSess), patch);
        }
    } catch (error) {
        console.error(`Error in logCodeSpace for ${s.codeSpace}:`, error);
    }
};