import { getDB } from "@spike.land/shadb";

export const shaDB = {
  get: async (key: string, type: "string" | "json") => {
    const db = await (await getDB("shaDB"))();
    return db.get(key, type);
  },
  put: async (key: string, value: string) => {
    const db = await (await getDB("shaDB"))();
    return db.put(key, value);
  },
};

export async function getUserId() {
  if (typeof window === "undefined") return "";

  const uuid = await shaDB.get("uuid", "string");
  if (!uuid) {
    const resp = await fetch(
      "https://spike.land/register",
    );
    const data = await resp.json();
    await shaDB.put("uuid", data.uuid);
    return data.uuid;
  }
  return uuid;
}
