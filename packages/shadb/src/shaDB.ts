import { assemble, diff, isDiff } from "../../diff/dist/diff.min.js";
import { openDB } from "https://unpkg.com/idb@5.0.8/build/esm/index.js";
import { sha256 } from "../../code/src/sha256.js";

export const getDB = () => {
  const dbPromise = openDB("localZedCodeStore", 1, {
    upgrade(db: {
      createObjectStore: (name: string) => void;
    }) {
      db.createObjectStore("codeStore");
    },
    blocked() {
    },
    blocking() {
    },
    terminated() {
    },
  });

  return getDbObj(dbPromise, true);
};

export const getDbObj = (dbPromise, isIdb = false) => {
  const dbObj = {
    async get(
      key: string,
      format: "string" | "json" | "stream" = "string",
    ): Promise<string | unknown | null> {
      let data;
      try {
        if (isIdb) {
          data = await (await dbPromise).get("codeStore", key);
        } else {
          data = await dbPromise.get(key);
        }

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
        if (
          typeof oldKey === "string" && typeof val === "string" &&
          oldKey.length === 8 && oldKey !== val
        ) {
          const actualValue = await dbObj.get(val);
          const prevValue = await dbObj.get(oldKey);
          if (typeof prevValue === "string") {
            const prevSha = await sha256(prevValue);

            if (prevSha === oldKey) {
              const diffObj = await diff(actualValue, prevValue);
              const diffAsStr = diffObj.b + JSON.stringify(diffObj.c);
              (await dbPromise).put("codeStore", diffAsStr, prevSha);
            }
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
      if (isIdb) {
        return (await dbPromise).put("codeStore", str, key);
      } else {
        return await dbPromise.put(key, str);
      }
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
