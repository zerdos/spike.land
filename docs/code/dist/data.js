export async function getZkey(hash) {
  const { sha256 } = await import("./sha256.js");
  const uuid = await getUserId();

  const uKey = await sha256(uuid);
  const gKey = await sha256(hash + uKey);
  const vKey = await sha256(hash + uuid);
  return `${hash}${uKey}${gKey}${vKey}`;
}

export async function getUserId() {
  const { getDB } = await import("./shaDB.min.js");
  const shaDB = await getDB();
  const uuid = await shaDB.get("uuid");
  if (!uuid) {
    if (!window.location.href.includes("zed.dev")) {
      const resp = await fetch("https://code.zed.vision/register");
      const data = await resp.json();
      shaDB.put("uuid", data.uuid);
      return data.uuid;
    } else {
      shaDB.put("uuid", "1234");
      return "1234";
    }
  }
  return uuid;
}

export const getProjects = async (uuid, v4) => {
  const { getDB } = await import("./shaDB.min.js");
  const shaDB = await getDB();
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

  const { getDB } = await import("./shaDB.min.js");



  const { sha256 } = await import("./sha256.js");
  const hash = await sha256(code);
  const projectName = await getProjects()

  try {
    const shaDB = await getDB();
    const prevHash = await shaDB.get(projectName);

    if (prevHash !== hash) {

      await shaDB.put(hash, code);
      await shaDB.put(projectName, hash);
``
      // setQueryStringParameter("h", hash);
      //const response = fetch(request);
    }
  } catch (e) {
    console.error(e);
  }

  // lets not save now - we will save the diff only
  // await response;
};