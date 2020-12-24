import { getDB } from "https://unpkg.com/@zedvision/shadb@10.12.20/dist/shadb.esm.js";

export const shaDB = {
  get: async (...args) => {
    const db = await getDB();
    return db.get(...args);
  },
  put: async (...args) => {
    const db = await getDB();
    return db.put(...args);
  },
};
