import { createInstance } from "localforage";
import { makeHash } from "./makeSess";
import { db } from "./session";
const promises = {};
const dbs = {};
export async function initDb(codeSpace) {
    if (dbs[codeSpace])
        return dbs[codeSpace];
    promises[`db-init-${codeSpace}`] = promises[`db-init-${codeSpace}`]
        || (async () => {
            const dbInstance = createInstance({
                name: `/live/${codeSpace}`,
            });
            await dbInstance.ready();
            let head = await dbInstance.getItem("head");
            let session;
            try {
                session = globalThis.cSess.session;
            }
            catch {
                session = await fetch(`${location.origin}/live/${codeSpace}/session.json`).then((x) => x.json());
            }
            if (!head) {
                head = makeHash(session);
                await dbInstance.setItem(String(head), session);
                await dbInstance.setItem("head", head);
            }
            dbs[codeSpace] = dbInstance;
        })();
    await promises[`db-init-${codeSpace}`];
    return dbs[codeSpace];
}
export const ldb = (codeSpace) => db(codeSpace, initDb);
