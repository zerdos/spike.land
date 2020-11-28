export const getDB = async () => {
  const { openDB } = await import(
    "https://unpkg.com/idb@5.0.7/build/esm/index.js"
  );

  const dbPromise = openDB("localZedCodeStore", 1, {
    upgrade(db) {
      db.createObjectStore("codeStore");
    },
  });

  return {
    async get(key: string, format = "string") {
      const data = (await dbPromise).get("codeStore", key);
      if (!data) return null;
      if (format === "string") {
        const allData = await data;
        if (typeof allData === format) return allData;

        const decoder = new TextDecoder();
        const text = decoder.decode(allData);
        return text;
      }
      return data;
    },
    async put(key: sting, val: string) {
      let str = val;
      if (typeof val !== "string") {
        str = new TextDecoder().decode(val);
      }

      return (await dbPromise).put("codeStore", str, key);
    },
    async delete(key) {
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
