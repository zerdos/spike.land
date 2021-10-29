import { dynamicImport } from "../../dynamicImport";

export const shaDB = {
  get: async (key: string, type: "string" | "json") => {
    const { getDB } = await dynamicImport("@spike.land/shadb");
    const db = await (await getDB("shaDB"))();
    return db.get(key, type);
  },
  put: async (key: string, value: string) => {
    const { getDB } = await dynamicImport("@spike.land/shadb");

    const db = await (await getDB("shaDB"))();
    return db.put(key, value);
  },
};

export async function getUserId() {
  if (typeof window === "undefined") return "";

  const uuid = await shaDB.get("uuid", "string");
  if (!uuid) {
    const resp = await fetch(
      "https://code.spike.land/register",
    );
    const data = await resp.json();
    await shaDB.put("uuid", data.uuid);
    return data.uuid;
  }
  return uuid;
}
