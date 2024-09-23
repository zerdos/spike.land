import { makeSession, ICodeSession, stringifySession, md5, createPatch } from "@spike-land/code";

const codeChain = "https://x-chain.spike.land";

const getVal =async (codeSpace: string, counter:number) => await fetch(`${codeChain}/${codeSpace}/${counter}`).then(x=>x.json());

const saveVal = async (codeSpace: string, counter:number, data: unknown) => await fetch(`${codeChain}/${codeSpace}/${counter}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
    },
}).then(x=>x.json());





const cache = new Map<string, ICodeSession>();

export const logCodeSpace =async (sess: ICodeSession) => {

    if(cache.has(sess.codeSpace)) return;
    const s = makeSession(sess);
    cache.set(s.codeSpace, s);

   await  saveVal ( s.codeSpace , s.counter, s);

    


    const hash = md5(stringifySession(s));

 
 
    const oldSess = cache.get(`${s.codeSpace}/${s.counter-1}`) || await getVal(s.codeSpace,s.counter-1);
    if (oldSess) {

    const patch =     createPatch(oldSess,s);

    (oldSess.i %10 === 0 )? (  await  saveVal(oldSess.codeSpace.codeSpace,oldSess.counter, {...patch, ...oldSess})) :   (await saveVal(oldSess.codeSpace.codeSpace,oldSess.counter, patch));
    }

}
    
