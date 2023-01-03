import { createInstance } from "localforage";
import { db, hashCode, ICodeSession, mST } from "./session";

const promises: { [codeSpace: string]: Promise<void> } = globalThis.pppp = globalThis.pppp || {};
const dbs: { [codeSpace: string]: LocalForage } = globalThis.dddd = globalThis.dddd || {};

export async function initDb(codeSpace: string) {
  if (dbs[codeSpace]) return dbs[codeSpace];

  promises[`db-init-${codeSpace}`] = promises[`db-init-${codeSpace}`]
    || (async () => {
      const dbInstance = createInstance({
        name: `/live/${codeSpace}`,
      });
      await dbInstance.ready();
      let head = await dbInstance.getItem("head");
      let session: ICodeSession;

      try {
        session = mST(codeSpace);
      } catch {
        session = await fetch(location.origin + "/live/" + codeSpace + "/session.json").then(x => x.json());
      }
      if (!head) {
        head = hashCode(session);
        await dbInstance.setItem("#" + String(head), session);
        await dbInstance.setItem("head", head);
        dbs[codeSpace] = dbInstance;
      }
    })();

  await promises[`db-init-${codeSpace}`];
  return dbs[codeSpace];
}

export const ldb = (codeSpace: string) => db(codeSpace, initDb);
