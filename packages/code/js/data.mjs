import { sha256, shaDB } from "@spike.land/shadb";
import v4 from "uuid/v4";
import Hash from "ipfs-only-hash";

/** @type {string} */
let uuid;
export const getProjects = async () => {
  uuid = await getUserId();
  const userData = await shaDB.get(uuid, "json");

  let appHash = null;
  if (userData && userData.signal) {
    //  setTimeout(()

    return userData.signal;
  }

  if (typeof userData === "string" || userData === null || !userData.list) {
    const projectId = v4();

    await shaDB.put(
      uuid,
      JSON.stringify({
        ...userData,
        list: [projectId],
        [projectId]: {
          lastOpen: Date.now(),
        },
      }),
    );

    if (appHash !== null) await shaDB.put(projectId, appHash);
    return [projectId];
  }

  if (appHash !== null) await shaDB.put(userData.list[0], appHash);
  return userData.list;
};

async function addNewProject(projectName, hash) {
  uuid = await getUserId();
  const userData = await shaDB.get(uuid, "json") || { list: [] };
  const projectId = v4();
  const updated = {
    ...userData,
    projects: {
      ...userData.projects,
      [projectName]: {
        projectId,
        lastOpen: Date.now(),
      },
    },
    [projectId]: {
      lastOpen: Date.now(),
    },
    list: [
      projectId,
      ...userData.list,
    ],
  };

  await shaDB.put(uuid, JSON.stringify(updated));

  await shaDB.put(projectId, hash);
}

export async function getUserId() {
  if (uuid) return uuid;

  const newID = await shaDB.get("uuid", "string");

  if (!newID) {
    const resp = await fetch(
      "https://spike.land/register",
    );
    const data = await resp.json();
    if (uuid) return uuid;
    uuid = data.uuid;
    await shaDB.put("uuid", data.uuid);
    return data.uuid;
  }
  return newID;
}

/** @type {string} */
let activeProject;
async function getActiveProject() {
  if (activeProject) return activeProject;
  const projects = await getProjects();
  if (projects.rootUrl) return projects;
  activeProject = projects[0];
  return activeProject;
}

export async function edit(name) {
  console.log(name);
  const rootUrl =
    (window.location.href.endsWith("/edit/")
      ? window.location.href.slice(0, -5)
      : window.location.href.slice(0, -4));

  const appCode = await fetch(`${rootUrl}/app.tsx`).then((res) => res.text());
  const hash = await sha256(appCode);

  await shaDB.put(hash, appCode);
  const project = JSON.stringify({
    code: hash,
    transpiled: "",
    html: "",
    url: rootUrl,
  });

  const projectSha = await sha256(project);
  await shaDB.put(projectSha, project);

  await addNewProject(name, projectSha);

  console.log("done");

  location.href = "https://code.spike.land";
}

/**
 * @param {string|undefined} _rootUrl
 */
export async function getIPFSCodeToLoad(_rootUrl) {
  const rootUrl = _rootUrl ||
    (window.location.href.endsWith("/edit/")
      ? window.location.href.slice(0, -5)
      : window.location.href.slice(0, -4));

  const codeReq = await fetch(rootUrl + "app.tsx");
  const code = await codeReq.text();

  const ret = {
    code: code,
    url: rootUrl,
    transpiled: "",
    html: "",
  };
  console.log({ ret });
  return ret;
}

export async function getCodeToLoad() {
  const projectName = await getActiveProject();
  if (projectName.rootUrl) {
    return getIPFSCodeToLoad(projectName.rootUrl);
  }
  const keyToLoad = await shaDB.get(projectName, "string");

  let projectDesc;

  try {
    projectDesc = await shaDB.get(keyToLoad, "json");
  } catch {
    const data = {
      code: projectDesc,
      transpiled: null,
      html: null,
    };
    return data;
  }
  if (projectDesc !== null && projectDesc !== undefined) {
    const data = {
      code: await shaDB.get(projectDesc.code, "string") || await getStarter(),
      transpiled: await shaDB.get(projectDesc.transpiled, "string") || "",
      html: await shaDB.get(projectDesc.html, "string") || "",
    };

    return data;
  }

  const data = {
    code: await shaDB.get(projectDesc, "string") ||
      await getStarter(),
    transpiled: null,
    html: null,
  };
  return data;
}

const saved = {
  code: "",
  html: null,
  transpiled: null,
  url: null,
};

const toSave = {
  code: "",
  html: null,
  transpiled: null,
};

export const saveCode =

  /**
   * @param {{ code: any; url?: any; html?: any; transpiled?: any; i?: number; }} opts
   * @param {number} counter
   */
  async (opts, counter) => {
    const { code, codeNonFormatted, html, transpiled } = opts;
    toSave.code = code || await getStarter();

    // deno-lint-ignore ban-ts-comment
    //@ts-ignore

    if (opts.i > counter) return;

    if (opts.code !== toSave.code) {
      return null;
    }
    if (toSave.code === saved.code && saved.url !== null) {
      return saved.url;
    }

    toSave.code = opts.code;

    if (window.broad && codeNonFormatted) {
      const { broad, starterCode } = window;
      const hashOfCode = await Hash.of(codeNonFormatted);
      const hashOfStarterCode = await Hash.of(window.starterCode);
      broad({
        starterCode,
        code: codeNonFormatted,
        transpiled,
        html,
        hashOfStarterCode,
        hashOfCode,
      });
    }
    // const saveCode = async () => {
    //   const res = await ipfsClient.add(code, { onlyHash: true });
    //   // const CID = res.cid.toString();
    //   // const UID = await getUserId();

    //   // const url = `/add/${CID}`;
    //   // fetch(`https://code.spike.land${url}`, {
    //   //   method: "POST",
    //   //   headers: {
    //   //     UID: UID,
    //   //   },
    //   //   body: code,
    //   // });
    // };
    // saveCode();
    const { shareItAsHtml } = await import("./share.mjs");
    const sharePromise = shareItAsHtml(
      { code, html, transpiled },
    );

    if (opts.i > counter) return;
    const url = await sharePromise;
    const projectName = await getActiveProject();
    if (opts.i > counter) return;
    opts.url = url;
    // const prevHash = await shaDB.get(projectName, "string");
    const desc = {
      url: await sha256(url),
      code: await sha256(code),
      html: await sha256(html),
      transpiled: await sha256(transpiled),
    };

    const hash = await sha256(JSON.stringify(desc));
    await shaDB.put(hash, JSON.stringify(desc));

    // const prevData = await shaDB.get(prevHash, s);
    if (code) {
      await shaDB.put(desc.code, code);
    }
    if (html) {
      await shaDB.put(desc.html, html);
    }
    if (transpiled) {
      await shaDB.put(desc.transpiled, transpiled);
    }

    await shaDB.put(projectName, hash);
    Object.assign(saved, { html, code, transpiled, url });
    return saved;
  };

function getStarter() {
  return fetch(`https://code.spike.land/js/examples/rca.tsx`).then((res) =>
    res.text()
  );
}
