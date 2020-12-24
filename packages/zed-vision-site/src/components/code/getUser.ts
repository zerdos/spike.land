export async function getUserId() {
  if (typeof window === "undefined") return "";

  const { importScript } = await import("./importScript.js");
  const { getDB } = await importScript(
    "https://unpkg.com/@zedvision/shadb@10.12.3/dist/shadb.umd.js",
  );

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
