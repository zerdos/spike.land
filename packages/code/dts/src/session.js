import { Mutex } from "async-mutex";
import imap from "./importMap";
import HTML from "./index.html";
import { md5 } from "./md5";
export { HTML, md5 };
export const importMap = { imports: imap.imports };
export function db(codeSpace, initDb) {
    const mod = {
        syncDb: async (oldSession, newSession, message) => {
            const { getItem, setItem } = mod;
            return await syncStorage(setItem, getItem, oldSession, newSession, message);
        },
        getItem: async (key) => {
            const db = await initDb(codeSpace);
            return await db.getItem(key);
        },
        setItem: async (key, value) => {
            const db = await initDb(codeSpace);
            return await db.setItem(key, value);
        },
    };
    return mod;
}
const storageMutex = new Mutex();
export const syncStorage = async (setItem, getItem, oldSession, newSession, message) => {
    await storageMutex.runExclusive(async () => {
        const hashOfOldSession = oldSession.newHash;
        let historyHead = String(await getItem("head"));
        if (!historyHead) {
            await setItem(String(hashOfOldSession), oldSession);
            await setItem("head", hashOfOldSession);
            historyHead = hashOfOldSession;
        }
        await setItem(String(message.newHash), {
            ...newSession,
            oldHash: message.oldHash,
            reversePatch: message.reversePatch,
        });
        const oldNode = (await getItem(String(historyHead)));
        await setItem(String(historyHead), {
            newHash: message.newHash,
            patch: message.patch,
            ...(oldNode
                ? {
                    i: oldNode.i,
                    oldHash: oldNode.oldHash,
                    reversePatch: oldNode.reversePatch,
                }
                : {
                    code: oldSession.code,
                    html: oldSession.html,
                    css: oldSession.css,
                }),
        });
        await setItem("head", message.newHash);
    });
};
