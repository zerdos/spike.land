import { diff } from "../../diff/diff.min.js";
import { openDB } from "https://unpkg.com/idb@5.0.8?module";
import { sha256 } from "./sha256.ts";

export const getDB = async () => {
  const dbPromise = openDB("localZedCodeStore", 1, {
    upgrade(db) {
      db.createObjectStore("codeStore");
    },
  });

  const dbObj = {
    async get(key: string, format: "string" | "json" | "stream" = "string") {
      let data;
      try {
        data = (await dbPromise).get("codeStore", key);

        if (!data) return null;
      } catch (_) {
        return null;
        //key not found that we write - its ok.
      }
      if (format === "json") {
        return JSON.parse(data);
      }
      if (format === "string") {
        const allData = await data;
        if (typeof allData === format) return allData;

        const decoder = new TextDecoder();
        const text = decoder.decode(allData);
        return text;
      }
      return data;
    },
    async put(key: string, val: string | ArrayBuffer) {
      let prev;

      try {
        const realKey = await dbObj.get(key);
        if (realKey.length === 8) prev = await dbObj.get(realKey);
        if (prev) {
          //compressing the old value
          const valVal = await dbObj.get(val);
          // console.log(prev, valVal);
          const diffObj = await diff(prev, valVal);
          // console.log(JSON.stringify(diffObj));
          const diffAsStr = diffObj.b + JSON.stringify(diffObj.c);
          if (prev.length > diffAsStr.length) {
            (await dbPromise).put("codeStore", diffAsStr, val);
          }
          // console.log(diffAsStr);
        }
      } catch {
        prev = "";
      }

      if (prev !== "" && val === prev) return data;

      let str: string;
      if (typeof val !== "string") {
        str = new TextDecoder().decode(val);
      } else {
        str = val;
      }

      return (await dbPromise).put("codeStore", str, key);
    },
    async delete(key: string) {
      return (await dbPromise).delete("codeStore", key);
    },
    async clear() {
      return (await dbPromise).clear("codeStore");
    },
    async keys() {
      return (await dbPromise).getAllKeys("codeStore");
    },
  };
  return dbObj;
};
