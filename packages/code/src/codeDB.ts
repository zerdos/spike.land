import { assemble, diff, isDiff } from "../../diff/diff.min.js";
import { openDB } from "idb";
import { sha256 } from "./sha256.ts";

export const getDB = () => {
  const dbPromise = openDB("localZedCodeStore", 1, {
    upgrade(db) {
      db.createObjectStore("codeStore");
    },
  });

  const dbObj = {
    async get(key: string, format: "string" | "json" | "stream" = "string") {
      let data;
      try {
        data = await (await dbPromise).get("codeStore", key);

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
        if (typeof allData === "string" && format === "string") {
          const text = allData;
          if (isDiff(text)) {
            const keyOfDiff = text.slice(0, 8);
            const instructions = text.slice(8);
            const oldValue = await dbObj.get(keyOfDiff);
            return assemble(oldValue, instructions);
          }

          return allData;
        }

        const decoder = new TextDecoder();
        const text = decoder.decode(allData);

        return text;
      }
      return data;
    },
    async put(key: string, val: string | ArrayBuffer) {
      let prev;

      try {
        const oldKey = await dbObj.get(key);
        // console.log(realKey);
        if (oldKey.length === 8 && oldKey !== val) {
          const actualValue = await dbObj.get(val);
          const prevValue = await dbObj.get(oldKey);
          const prevSha = await sha256(prevValue);

          if (prevSha === oldKey) {
            const diffObj = await diff(actualValue, prevValue);
            const diffAsStr = diffObj.b + JSON.stringify(diffObj.c);
            (await dbPromise).put("codeStore", diffAsStr, prevSha);
          }
        }
      } catch {
        prev = "";
      }

      if (prev !== "" && val === prev) return val;

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
