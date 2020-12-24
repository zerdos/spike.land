import { shaDB } from "./db.js";
import v4 from "https://unpkg.com/uuid@8.3.2/dist/esm-browser/v4.js";
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

  const search = new URLSearchParams(location.search);
  const keyToLoad = search.get("h") || await shaDB.get(projectName);

  if (keyToLoad) {
    let code;
    try {
      code = await shaDB.get(keyToLoad);
    } catch {
      console.error("error load key: " + keyToLoad);
    }

    if (code) return { code };

    let text;
    try {
      const resp = await fetch("https://code.zed.vision/?h=" + keyToLoad);
      text = await resp.json();
    } catch (e) {
      const { sha256 } = await import("./sha256.js");
      const { starter } = await import("./starterNoFramerMotion.js");
      const shaHash = await sha256(starter);

      await shaDB.put(shaHash, starter);
      await shaDB.put(projectName, shaHash);
      return { code: starter };
    }

    return { code: text };
  }

  return starter;
}
