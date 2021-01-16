import { v } from "./versions.js";
export const sha256 = 
/**
* @param {string} str
*/
async (str) => {
    const { sha256 } = await import(`https://unpkg.com/@zedvision/shadb@${v.shadb}/src/sha256.js`);
    return sha256(str);
};
export const shaDB = {
    /**
   * @param {string} key
   * @param {"string" | "json"} type
   */
    get: async (key, type) => {
        const { getDB } = await import(`https://unpkg.com/@zedvision/shadb@${v.shadb}/src/shaDB.js`);
        const db = await (await getDB("shaDB"))();
        return db.get(key, type);
    },
    /**
   * @param {string} key
   * @param {string} value
   */
    put: async (key, value) => {
        const { getDB } = await import(`https://unpkg.com/@zedvision/shadb@${v.shadb}/src/shaDB.js`);
        const db = await (await getDB("shaDB"))();
        return db.put(key, value);
    },
};
