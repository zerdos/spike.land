export async function getUserId() {
  if (typeof window === "undefined") return "";

  const { getDB } = await new Function(`
  return async ()=> {  
    const {getDB} = await import("https://unpkg.com/@zedvision/shadb@8.7.0/dist/shaDB.js");
return getDB;
  }
`)();

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
