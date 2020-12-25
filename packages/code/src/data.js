import { shaDB } from "./db.js";

import v4 from "https://unpkg.com/uuid@8.3.2/dist/esm-browser/v4.js?module";

import { sha256 } from "./sha256.js";

export async function getZkey(hash) {
  const uuid = await getUserId();
  const uKey = await sha256(uuid);
  const gKey = await sha256(hash + uKey);
  const vKey = await sha256(hash + uuid);

  return `${hash}${uKey}${gKey}${vKey}`;
}

export async function getUserId() {
  const uuid = await shaDB.get("uuid");
  if (!uuid) {
    const resp = await fetch("https://code.zed.vision/register");
    const data = await resp.json();
    await shaDB.put("uuid", data.uuid);
    return data.uuid;
  }
  return uuid;
}

export const getProjects = async () => {
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

export async function getCodeToLoad() {
  const projects = await getProjects();
  const projectName = projects[0];

  const search = new URLSearchParams(window.location.search);
  const keyToLoad = search.get("h") || await shaDB.get(projectName);

  if (keyToLoad) {
    const code = await shaDB.get(keyToLoad, "string");

    if (code) return { code };
  }

  const {starter} = await import("./starter.js");
  return { code: starter};
}
