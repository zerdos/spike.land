export const shaDB = {
  get: async (key: string, type: "string" | "json") => {
    const { getDB } = await new Function(
      "return import(`https://code.zed.vision/modules/shaDB.js`)",
    )();
    const db = await (await getDB("shaDB"))();
    return db.get(key, type);
  },
  put: async (key: string, value: string) => {
    const { getDB } = await new Function(
      "return import(`https://code.zed.vision/modules/shaDB.js`)",
    )();

    const db = await (await getDB("shaDB"))();
    return db.put(key, value);
  },
};

export async function getUserId() {
  if (typeof window === "undefined") return "";

  const uuid = await shaDB.get("uuid", "string");
  if (!uuid) {
    const resp = await fetch("https://zed.vision/register");
    const data = await resp.json();
    await shaDB.put("uuid", data.uuid);
    return data.uuid;
  }
  return uuid;
}
