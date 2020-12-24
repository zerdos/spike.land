import { getDB } from "https://unpkg.com/@zedvision/shadb@10.12.20/dist/shadb.esm.js";

let db;

export const shaDB = {
  get: async (...args) => {
    const DB = await db;
    db=getDB();
    return DB.get.apply(DB, args);
  },
  put: async (...args) => {
    const DB = await db;
    db=getDB();
    return DB.put.apply(DB, args);
  },
};
