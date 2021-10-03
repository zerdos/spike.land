import { assemble, diff, isDiff } from "./diff";

import { sha256 } from "./sha256";

export const getDbObj = (db) => {
  const dbObj = {
    async get(key, format = "string") {
      let data;
      try {
        data = await db.get(key);
        if (!data) {
          return null;
        }
      } catch (_) {
        return null;
        //key not found that we write - its ok.
      }
      if (format === "json") {
        try {
          const json = JSON.parse(data);
          return json;
        } catch {
          return data;
        }
      }
      const allData = await data;
      if (format === "string") {
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
        return new TextDecoder().decode(allData);
      }
      return data;
    },
    async put(key, val) {
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
              await dbObj.put(prevSha, diffAsStr);
            }
          }
        }
      } catch {
        prev = "";
      }
      if (prev !== "" && val === prev) {
        return val;
      }
      let str;
      if (typeof val !== "string") {
        str = new TextDecoder().decode(val);
      } else {
        str = val;
      }

      return await db.put(key, str);
    },
    async delete(key) {
      return await db.delete(key);
    },
    async clear() {
      return await db.clear();
    },
    async keys() {
      return await db.getAllKeys();
    },
  };
  return dbObj;
};
