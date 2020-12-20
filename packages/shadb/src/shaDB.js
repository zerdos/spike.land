import { openDB } from "https://unpkg.com/idb@5.0.8/build/esm/index.js";

import { getDbObj } from "./getDbObj.js";

export const getDB = () => {
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
};
