export const shaDB = {
  get: async (key, type) => {
    const { getDB } = await (new Function(
      `return  import("https://unpkg.com/@zedvision/shadb@10.13.18/src/shaDB.js")`,
    ));
    const db = await (await getDB("shaDB"))();
    return db.get(key, type);
  },
  put: async (key, value) => {
    const { getDB } = await (new Function(
      `return import("https://unpkg.com/@zedvision/shadb@10.13.18/src/shaDB.js")`,
    ));
    const db = await (await getDB("shaDB"))();
    return db.put(key, value);
  },
};

export async function getUserId() {
  if (typeof window === "undefined") return "";

  const uuid = await shaDB.get("uuid");
  if (!uuid) {
    const resp = await fetch("https://code.zed.vision/register");
    const data = await resp.json();
    await shaDB.put("uuid", data.uuid);
    return data.uuid;
  }
  return uuid;
}
