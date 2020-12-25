import { openDB } from "https://unpkg.com/idb@5.0.8/build/esm/index.js?module";
import { getDbObj } from "./getDbObj.js";

export function getDB(storeName="defaultStore") {
 

  return async()=>{

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
      async set(key, val) {
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

    return getDbObj(keyVal)
  }
}
