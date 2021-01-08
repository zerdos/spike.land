import { sha256, shaDB } from "./db.js";
import { sendSignal } from "./hash.js";
import getVersions from "./versions.js";
const v = getVersions();

export const getProjects = async () => {
  const uuid = await getUserId();
  const projects = await shaDB.get(uuid, "json");

  if (typeof projects === "string" || projects === null || !projects.list) {
    const v4 = (await import(
      `https://unpkg.com/uuid@${v.uuid}/dist/esm-browser/v4.js`
    )).default;
    const projectId = v4();

    await shaDB.put(
      uuid,
      JSON.stringify({
        list: [projectId],
        [projectId]: {
          lastOpen: Date.now(),
        },
      }),
    );

    return [projectId];
  }

  return projects.list;
};

/**
 * @param {string} hash
 */
export async function getZkey(hash) {
  const uuid = await getUserId();
  const uKey = await sha256(uuid);
  const gKey = await sha256(hash + uKey);
  const vKey = await sha256(hash + uuid);

  return `${hash}${uKey}${gKey}${vKey}`;
}

/** @type {string} */
let uuid;
export async function getUserId() {
  if (uuid) return uuid;

  uuid = await shaDB.get("uuid", "string");
  if (!uuid) {
    const resp = await fetch("https://zed.vision/register");
    const data = await resp.json();
    await shaDB.put("uuid", data.uuid);
    return data.uuid;
  }
  return uuid;
}

/** @type {string} */
let activeProject;
async function getActiveProject() {
  if (activeProject) return activeProject;
  const projects = await getProjects();
  activeProject = projects[0];
  return activeProject;
}

export async function getCodeToLoad() {
  const projectName = await getActiveProject();
  const keyToLoad = await shaDB.get(projectName, "string");

  let projectDesc;

  try {
    projectDesc = await shaDB.get(keyToLoad, "json");
  } catch {
    const data = {
      code: projectDesc,
      transpiled: null,
      html: null,
      versions: null,
    };
    return data;
  }
  if (projectDesc !== null && projectDesc !== undefined) {
    const data = {
      code: await shaDB.get(projectDesc.code, "string"),
      transpiled: await shaDB.get(projectDesc.transpiled, "string") || "",
      html: await shaDB.get(projectDesc.html, "string") || "",
      versions: await shaDB.get(projectDesc.versions, "string") || "",
    };

    return data;
  }

  const data = {
    code: await shaDB.get(projectDesc, "string") ||
      (await import("./starter.js")).starter,
    transpiled: null,
    html: null,
    versions: null,
  };
  return data;
}

const saved = {
  code: null,
  html: null,
  transpiled: null,
  url: null,
};

const toSave = {
  code: "",
  semafor: false,
  html: null,
  transpiled: null,
};

/**
 * 
 * @param {{code:string, html: string, transpiled: string, versions: string }} opts 
 */

export const saveCode = (opts) => {
  const { code, html, transpiled, versions } = opts;
  toSave.code = code;

  setTimeout(() =>
    (async (codeToSave) => {
      if (codeToSave !== toSave.code) return null;
      if (toSave.code === saved.code && saved.url !== null) return saved.url;
      if (toSave.semafor) saveCode(opts);

      toSave.code = codeToSave;
      toSave.semafor = true;

      const { shareItAsHtml } = await import("./share.js");
      const sharePromise = shareItAsHtml({ code, HTML: html, transpiled });

      const projectName = await getActiveProject();
      // const prevHash = await shaDB.get(projectName, "string");

      const desc = {
        code: await sha256(code),
        html: await sha256(html || ""),
        transpiled: await sha256(transpiled),
        versions: await sha256(versions || ""),
      };

      const hash = await sha256(JSON.stringify(desc));
      await shaDB.put(hash, JSON.stringify(desc));

      // const prevData = await shaDB.get(prevHash, s);
      if (code) shaDB.put(desc.code, code);
      if (html) shaDB.put(desc.html, html);
      if (transpiled) shaDB.put(desc.transpiled, transpiled);
      if (versions) shaDB.put(desc.versions, versions);

      await shaDB.put(projectName, hash);
      const url = await sharePromise;
      Object.assign(saved, { html, code, transpiled, url });
      console.log({ html, code, transpiled, url });

      toSave.semafor = false;
      return url;
    })(code), 200);
};
