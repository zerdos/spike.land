import { diff } from "../../diff/diff.min.js";
import { openDB } from "https://unpkg.com/idb@5.0.8?module";
import { sha256 } from "./sha256.ts";

export const getDB = async () => {
  const dbPromise = openDB("localZedCodeStore", 1, {
    upgrade(db) {
      db.createObjectStore("codeStore");
    },
  });

  const isDiff = (str) => {
    if (str.length < 10) return false;
    const isKey =
      [...(str.slice(0, 8))].filter((x) => x < 0 || x > "f").length === 0;
    const maybeInst = str.slice(8);

    if (
      isKey && maybeInst[0] === "[" && maybeInst[maybeInst.length - 1] === "]"
    ) {
      try {
        return JSON.parse(maybeInst).length > 1;
      } catch {
        return false;
      }
      return true;
    }

    return false;
  };

  const assemble = (oldValue, instructions) => {
    const instArr = JSON.parse(instructions);
    let old = oldValue.slice();

    let ret = "";

    instArr.forEach((element) => {
      if (Number(element) === element) {
        const absNum = Math.abs(element);
        const currentString = old.slice(0, absNum);
        old = old.slice(absNum);
        if (element > 0) ret += String(currentString);
      } else {
        ret += String(element);
      }
    });
    return ret;
  };

  const dbObj = {
    async get(key: string, format: "string" | "json" | "stream" = "string") {
      let data;
      console.log("GET ", key);
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
        if (typeof allData === format) {
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

        // if (prev) {
        //   //compressing the old value
        //   const valVal = await dbObj.get(val);
        //   // console.log(prev, valVal);
        //   const diffObj = await diff(prev, valVal);
        //   // console.log(JSON.stringify(diffObj));
        //   const diffAsStr = diffObj.b + JSON.stringify(diffObj.c);
        //   if (prev.length > diffAsStr.length) {
        //     (await dbPromise).put("codeStore", diffAsStr, realKey);
        //   }
        //   // console.log(diffAsStr);
        // }
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
