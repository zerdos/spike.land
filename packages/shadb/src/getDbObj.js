import {
  assemble,
  diff,
  isDiff,
} from "https://unpkg.com/@zedvision/diff@8.6.10/dist/diff.min.js"";
export const getDbObj = (dbPromise, isIdb = false) => {
  const sha256 = async (x) =>
    Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          typeof x === "string" ? new TextEncoder().encode(x) : x,
        ),
      ).slice(0, 4),
    ).map((b) => ("00" + b.toString(16)).slice(-2)).join("");
  const dbObj = {
    async get(key, format = "string") {
      let data;
      try {
        if (isIdb) {
          data = await (await dbPromise).get("codeStore", key);
        } else {
          data = await dbPromise.get(key);
        }
        if (!data) {
          return null;
        }
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
              dbObj.put(prevSha, diffAsStr);
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
      if (isIdb) {
        return (await dbPromise).put("codeStore", str, key);
      } else {
        return await dbPromise.put(key, str);
      }
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
  return dbObj;
};
