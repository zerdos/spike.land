import { createInstance } from "localforage";
import { db, hashKEY, mST } from "./session";
const promises: { [codeSpace: string]: Promise<void> } = {};
const dbs: { [codeSpace: string]: LocalForage } = {};

export async function initDb(codeSpace: string) {
  if ([codeSpace]) return dbs[codeSpace];

  promises[`db-init-${codeSpace}`] = promises[`db-init-${codeSpace}`]
    || (async () => {
      const dbInstance = createInstance({
        name: `/live/${codeSpace}`,
      });

      let head = await db(codeSpace, initDb).getItem("head");
      if (!head) {
        head = hashKEY(codeSpace);
        await dbInstance.setItem("#" + String(head), mST(codeSpace));
        await dbInstance.setItem("head", hashKEY(codeSpace));
        dbs[codeSpace] = dbInstance;
      }
    })();

  await promises[`db-init-${codeSpace}`];
  return dbs[codeSpace];
}

export const ldb = (codeSpace: string) => db(codeSpace, initDb);
