export const shaDB = {
  get: async (key, type) => {
    const { getDB } = await import(
      "https://unpkg.com/@zedvision/shadb@10.13.18/src/shaDB.js"
    );
    const db = await getDB("shaDB");
    return db.get(key, type);
  },
  put: async (key, value) => {
    const { getDB } = await import(
      "https://unpkg.com/@zedvision/shadb@10.13.18/src/shaDB.js"
    );
    const db = await (await getDB("shaDB"))();
    return db.put(key, value);
  },
};
