import { getDB } from "https://unpkg.com/@zedvision/shadb@10.12.16/dist/shadb.esm.js";

let db;

export const shaDB = {
  get: async (...args) => {
    db = db || await getDB();
    return db.get(...args);
  },
  put: async (...args) => {
    db = db || await getDB();
    return db.put(...args);
  },
};
