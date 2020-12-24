import { openDB } from "https://unpkg.com/idb@5.0.8/build/esm/index.js";
import { getDbObj } from "./getDbObj.js";

export function getDB() {
  const dbPromise = openDB("zed-vision-alpha", 2, {
    upgrade(db) {
      db.createObjectStore("sha-store");
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
