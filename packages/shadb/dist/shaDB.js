"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shaDB = exports.getDB = exports.getDbObj = exports.assemble = exports.diff = exports.sha256 = void 0;
//@ts-nocheck
const idb_1 = require("idb");
const getDbObj_js_1 = require("./getDbObj.js");
Object.defineProperty(exports, "getDbObj", { enumerable: true, get: function () { return getDbObj_js_1.getDbObj; } });
const sha256_js_1 = require("./sha256.js");
Object.defineProperty(exports, "sha256", { enumerable: true, get: function () { return sha256_js_1.sha256; } });
const diff_js_1 = require("./diff.js");
Object.defineProperty(exports, "assemble", { enumerable: true, get: function () { return diff_js_1.assemble; } });
Object.defineProperty(exports, "diff", { enumerable: true, get: function () { return diff_js_1.diff; } });
function getDB(storeName = "defaultStore") {
    return async () => {
        const dbPromise = (0, idb_1.openDB)("spike-land-alpha", 1, {
            upgrade(db) {
                db.createObjectStore(storeName);
            },
            blocked() {
            },
            blocking() {
            },
            terminated() {
            },
        });
        const keyVal = {
            async get(key) {
                return (await dbPromise).get(storeName, key);
            },
            async put(key, val) {
                return (await dbPromise).put(storeName, val, key);
            },
            async delete(key) {
                return (await dbPromise).delete(storeName, key);
            },
            async clear() {
                return (await dbPromise).clear(storeName);
            },
            async keys() {
                return (await dbPromise).getAllKeys(storeName);
            },
        };
        return (0, getDbObj_js_1.getDbObj)(keyVal);
    };
}
exports.getDB = getDB;
exports.shaDB = {
    /**
     * @param {string} key
     * @param {"string" | "json"} type
     */
    get: async (key, type) => {
        const db = await (await getDB("shaDB"))();
        return db.get(key, type);
    },
    /**
     * @param {string} key
     * @param {string} value
     */
    put: async (key, value) => {
        const db = await (await getDB("shaDB"))();
        return db.put(key, value);
    },
};
