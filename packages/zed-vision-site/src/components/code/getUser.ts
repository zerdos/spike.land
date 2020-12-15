import { getDB } from "@zedvision/shadb";

export async function getUserId() {
    const shaDB = await getDB();
    const uuid = await shaDB.get("uuid");
    if (!uuid) {
        const resp = await fetch("https://code.zed.vision/register");
        const data = await resp.json();
        shaDB.put("uuid", data.uuid);
        return data.uuid;
    }
    return uuid;
  }