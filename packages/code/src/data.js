import { getDB } from "https://unpkg.com/@zedvision/shadb/dist/shaDB.js";
import v4 from "https://cdn.skypack.dev/uuid@8.3.2/dist/esm-browser/v4.js";
import { sha256 } from "./sha256.js";

export async function getZkey(hash) {
  const uuid = await getUserId();
  const uKey = await sha256(uuid);
  const gKey = await sha256(hash + uKey);
  const vKey = await sha256(hash + uuid);
  return `${hash}${uKey}${gKey}${vKey}`;
}

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

export const getProjects = async () => {
  const shaDB = await getDB();

  const uuid = await getUserId();
  const projects = await shaDB.get(uuid, "json");

  if (typeof projects === "string" || projects === null || !projects.list) {
    const projectId = v4();

    await shaDB.put(
      uuid,
      JSON.stringify({
        list: [projectId],
        [projectId]: {
          created: Date.now(),
          lastOpen: Date.now(),
        },
      }),
    );

    return [projectId];
  }

  // const search = new URLSearchParams(window.location.search);

  // const keyToLoad = search.get("h") || await db.get(projectName);
  // if(keyToLoad){
  //   projects.map(p=>shaDB.get())
  // }

  return projects.list;
};

export const saveCode = async (code) => {
  const hash = await sha256(code);

  const projects = await getProjects();
  const projectName = projects[0];

  try {
    const shaDB = await getDB();
    const prevHash = await shaDB.get(projectName);

    if (prevHash !== hash) {
      await shaDB.put(hash, code);
      await shaDB.put(projectName, hash);
      // setQueryStringParameter("h", hash);
      //const response = fetch(request);
    }
  } catch (e) {
    console.error(e);
  }

  // lets not save now - we will save the diff only
  // await response;
};
