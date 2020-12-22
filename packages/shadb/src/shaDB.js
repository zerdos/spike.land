import { openDB } from "./vendor/idb.js";

import { getDbObj } from "./getDbObj.js";

export function getDB() {
  const dbPromise = openDB("localZedCodeStore", 1, {
    upgrade(db) {
      db.createObjectStore("codeStore");
    },
    blocked() {
    },
    blocking() {
    },
    terminated() {
    },
  });

  return getDbObj(dbPromise, true);
}
