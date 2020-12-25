import { getDB } from "https://unpkg.com/@zedvision/shadb@10.13.7/dist/shaDB.js";

export const shaDB = {
  get: async (key, type) => {
    const db = await (await getDB("shaDB"))();
    return db.get(key, type);
  },
  put: async (key, value) => {
    const db =await (await getDB("shaDB"))();
    return db.put(key, value);
  },
};
