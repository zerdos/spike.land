import type Env from "./env";   
import { makeSession, ICodeSession, stringifySession, md5, createPatch } from "@spike-land/code";

const getX= (env: Env) =>async (codeSpace: string, counter:number) => await env.X9.get(`${codeSpace}/${counter}`).then(x=>x?.json());

const saveX = (env: Env)=> async (codeSpace: string, counter:number, data: unknown) => env.X9.put(`$${codeSpace}/${counter}`, JSON.stringify(data));





const cache = new Map<string, ICodeSession>();


export const logCodeSpace =(env: Env) => async ( sess: ICodeSession) => {

    if(cache.has(sess.codeSpace)) return;
    const s = makeSession(sess);
    cache.set(s.codeSpace, s);

   const getVal = getX(env);
   const saveVal = saveX(env);
    await  saveVal ( s.codeSpace , s.counter, s);

    


    const hash = md5(stringifySession(s));

 
 
    const oldSess = cache.get(`${s.codeSpace}/${s.counter-1}`) || await getVal(s.codeSpace,s.counter-1);
    if (oldSess) {

    const patch =     createPatch(oldSess,s);

    (oldSess.i %10 === 0 )? (  await  saveVal(oldSess.codeSpace.codeSpace,oldSess.counter, {...patch, ...oldSess})) :   (await saveVal(oldSess.codeSpace.codeSpace,oldSess.counter, patch));
    }

}
    
