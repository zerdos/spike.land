export async function getUserId() {
  if (typeof window === "undefined") return "";

  const { getDB } = await new Function(
    `return import ("https://unpkg.com/@zedvision/shadb@10.12.20/dist/shadb.esm.js")`,
  )();

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
