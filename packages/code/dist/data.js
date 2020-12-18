export async function getZkey(hash) {
  const { sha256 } = await import("./sha256.js");
  const uuid = await getUserId();

  const uKey = await sha256(uuid);
  const gKey = await sha256(hash + uKey);
  const vKey = await sha256(hash + uuid);
  return `${hash}${uKey}${gKey}${vKey}`;
}

export async function getUserId() {
  const { getDB } = await import("../dist/shaDB.min.js");
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
  const { importScript } = await import(
    "https://unpkg.com/@zedvision/code@8.6.0/dist/importScript.js"
  );
  const { uuidv4 } = await importScript(
    "https://unpkg.com/uuid@latest/dist/umd/uuidv4.min.js",
  );

  const { getDB } = await import("../dist/shaDB.min.js");
  const shaDB = await getDB();

  const uuid = await getUserId();
  const projects = await shaDB.get(uuid, "json");

  if (typeof projects === "string" || projects === null || !projects.list) {
    const projectId = uuidv4();

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
  const { getDB } = await import("../dist/shaDB.min.js");

  const { sha256 } = await import("./sha256.js");
  const hash = await sha256(code);
  const projectName = await getProjects();

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
