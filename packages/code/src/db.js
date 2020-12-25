import { getDB } from "https://unpkg.com/@zedvision/shadb@10.13.1/dist/shaDB.js";

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
