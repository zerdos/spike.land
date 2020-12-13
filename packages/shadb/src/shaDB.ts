import { assemble, diff, isDiff } from "../../diff/dist/diff.min.js";
import {openDB} from "https://unpkg.com/idb@5.0.8/build/esm/index.js" ;
import { sha256 } from "../../code/src/sha256.js";
import {  getDbObj } from "./getDbObj.ts";

export const getDB =  () => {
  const dbPromise =  openDB("localZedCodeStore", 1, {
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