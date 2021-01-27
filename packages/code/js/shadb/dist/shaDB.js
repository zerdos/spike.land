//@ts-nocheck
import { openDB } from "./vendor/idb.js";
import { getDbObj } from "./getDbObj.js";
export function getDB(storeName = "defaultStore") {
  return async () => {
    const dbPromise = openDB("zed-vision-alpha", 1, {
      upgrade(db) {
        db.createObjectStore(storeName);
      },
      blocked() {
      },
      blocking() {
      },
      terminated() {
      },
    });
    const keyVal = {
      async get(key) {
        return (await dbPromise).get(storeName, key);
      },
      async put(key, val) {
        return (await dbPromise).put(storeName, val, key);
      },
      async delete(key) {
        return (await dbPromise).delete(storeName, key);
      },
      async clear() {
        return (await dbPromise).clear(storeName);
      },
      async keys() {
        return (await dbPromise).getAllKeys(storeName);
      },
    };
    return getDbObj(keyVal);
  };
}
export const shaDB = {
  /**
   * @param {string} key
   * @param {"string" | "json"} type
   */
  get: async (key, type) => {
    const db = await (await getDB("shaDB"))();
    return db.get(key, type);
  },
  /**
   * @param {string} key
   * @param {string} value
   */
  put: async (key, value) => {
    const db = await (await getDB("shaDB"))();
    return db.put(key, value);
  },
};
