import { getDB } from "https://unpkg.com/@zedvision/shadb@8.7.2/dist/shaDB.js";

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
