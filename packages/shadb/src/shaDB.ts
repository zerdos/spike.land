import { openDB } from "https://unpkg.com/idb@5.0.8/build/esm/index.js";
import { getDbObj } from "./getDbObj.ts";

export const getDB = () => {
  const dbPromise = openDB("localZedCodeStore", 1, {
    upgrade(db: {
      createObjectStore: (name: string) => void;
    }) {
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
