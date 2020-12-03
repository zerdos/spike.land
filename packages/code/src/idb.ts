import { diff } from "../../diff/diff.min.js";

export const getDB = async () => {
  const { openDB } = await import(
    "https://unpkg.com/idb@5.0.8/build/esm/index.js"
  );

  const dbPromise = openDB("localZedCodeStore", 1, {
    blocked() {},
    blocking() {},
    terminated() {},
    upgrade(db: any) {
      db.createObjectStore("codeStore");
    },
  });

  return {
    async get(key: string, format: "string" | "json" | "stream" = "string") {
      const data = (await dbPromise).get("codeStore", key);
      if (!data) return null;
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
      const prev = await (await dbPromise).get(key);
      if (val === prev) return;
      else {
        const diff = await diff(prev, val);
        const diffAsStr = [diff.b, ...diff.c].join();
        console.log(diffAsStr);
      }

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
};
