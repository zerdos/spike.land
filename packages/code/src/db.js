import { getDB } from "./shaDB.js";

export const shaDB = {
  get: async (key) => {
    const db = await (await getDB("shaDB"))();
    return db.get(key);
  },
  put: async (key, value) => {
    const db =await (await getDB("shaDB"))();
    return db.put(key, value);
  },
};
