import { createInstance } from "localforage";
import { ICodeSession, makeHash } from "./makeSess";
import { db } from "./session";

const promises: { [codeSpace: string]: Promise<void> } = {};
const dbs: { [codeSpace: string]: LocalForage } = {};

/**
 * Initialize the database for the given code space.
 * @param {string} codeSpace - The code space to initialize the database for.
 * @returns {Promise<LocalForage>} - The initialized LocalForage instance.
 */
export async function initDb(codeSpace: string): Promise<LocalForage> {
  // Return the existing database instance if already initialized
  if (dbs[codeSpace]) return dbs[codeSpace];

  // Ensure the initialization promise is only run once per code space
  promises[`db-init-${codeSpace}`] = promises[`db-init-${codeSpace}`]
    || (async () => {
      const dbInstance = createInstance({
        name: `/live/${codeSpace}`,
      });
      await dbInstance.ready();

      let head = await dbInstance.getItem("head");
      let session: ICodeSession;

      try {
        session = globalThis.cSess.session;
      } catch {
        session = await fetch(
          `${location.origin}/live/${codeSpace}/session.json`,
        ).then((x) => x.json());
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

/**
 * Create a database instance for the given code space.
 * @param {string} codeSpace - The code space to create the database instance for.
 * @returns {ReturnType<typeof db>} - The database instance.
 */
export const ldb = (codeSpace: string) => db(codeSpace, initDb);
