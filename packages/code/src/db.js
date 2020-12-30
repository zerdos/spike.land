import versions from "./versions.js";
export const shaDB = {
  /**
 * @param {string} key
 * @param {"string" | "json"} type 
 */
  get: async (key, type) => {
    const { getDB } = await import(
      `https://unpkg.com/@zedvision/shadb@${versions().shadb}/src/shaDB.js`
    );
    const db = await (await getDB("shaDB"))();
    return db.get(key, type);
  },

  /**
 * @param {string} key
 * @param {string} value
 */
  put: async (key, value) => {
    const { getDB } = await import(
      `https://unpkg.com/@zedvision/shadb@${versions().shadb}/src/shaDB.js`
    );
    const db = await (await getDB("shaDB"))();
    return db.put(key, value);
  },
};
