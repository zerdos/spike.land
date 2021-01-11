import { sha256, shaDB } from "./db.js";
import { waitForSignalAndRun } from "./hash.js";
import getVersions from "./versions.js";
const versions = getVersions();
export const getProjects = async () => {
    const uuid = await getUserId();
    const userData = await shaDB.get(uuid, "json");
    if (userData && userData.signal) {
        //  setTimeout(()=>{
        waitForSignalAndRun({
            signal: userData.signal,
            onSignal: async (getData) => {
                const data = await getData();
                await shaDB.put(uuid, JSON.stringify(Object.assign(Object.assign({}, userData), { signal: null })));
                window.location.href = data.rootUrl;
            },
        });
        //})
    }
    if (typeof userData === "string" || userData === null || !userData.list) {
        const v4 = (await import(`https://unpkg.com/uuid@${versions.uuid}/dist/esm-browser/v4.js`)).default;
        const projectId = v4();
        await shaDB.put(uuid, JSON.stringify(Object.assign(Object.assign({}, userData), { list: [projectId], [projectId]: {
                lastOpen: Date.now(),
            } })));
        return [projectId];
    }
    return userData.list;
};
/** @type {string} */
let uuid;
export async function getUserId() {
    if (uuid)
        return uuid;
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
    if (activeProject)
        return activeProject;
    const projects = await getProjects();
    activeProject = projects[0];
    return activeProject;
}
export async function getIPFSCodeToLoad() {
    const rootUrl = window.location.href.endsWith("/edit/")
        ? window.location.href.slice(0, -5)
        : window.location.href.slice(0, -4);
    const { v } = await import(rootUrl + "versions.js");
    const codeReq = await fetch(rootUrl + "app.tsx");
    const code = await codeReq.text();
    const ret = {
        code: code,
        url: rootUrl,
        versions: v,
        transpiled: "",
        html: "",
    };
    console.log({ ret });
    return ret;
}
export async function getCodeToLoad() {
    const projectName = await getActiveProject();
    const keyToLoad = await shaDB.get(projectName, "string");
    let projectDesc;
    try {
        projectDesc = await shaDB.get(keyToLoad, "json");
    }
    catch (_a) {
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
    code: "",
    html: null,
    transpiled: null,
    url: null,
};
const toSave = {
    code: "",
    semaphore: false,
    html: null,
    transpiled: null,
};
export const saveCode = 
/**
* @param {{ i?: number; unmount?: () => void; hydrated?: boolean; preRendered?: boolean; lastErrors?: number; rootElement?: null; div?: HTMLDivElement; html: any; versions: any; ipfs?: number; transpiled: any; code: any; }} opts
* @param {number} counter
*/
(opts, counter) => {
    const { code, html, transpiled, versions } = opts;
    toSave.code = code;
    // deno-lint-ignore ban-ts-comment
    //@ts-ignore
    function tryToSave(opts) {
        return setTimeout(async () => {
            const { code, html, transpiled, versions, i } = opts;
            if (i > counter)
                return;
            if (opts.code !== toSave.code) {
                return null;
            }
            if (toSave.code === saved.code && saved.url !== null) {
                return saved.url;
            }
            if (toSave.semaphore) {
                return tryToSave(opts);
            }
            toSave.code = opts.code;
            toSave.semaphore = true;
            const { shareItAsHtml } = await import("./share.js");
            const sharePromise = shareItAsHtml({ code, html, transpiled, versions });
            const url = await sharePromise;
            const projectName = await getActiveProject();
            opts.url = url;
            // const prevHash = await shaDB.get(projectName, "string");
            const desc = {
                url: await sha256(url),
                code: await sha256(code),
                html: await sha256(html),
                transpiled: await sha256(transpiled),
                versions: await sha256(JSON.stringify(versions)),
            };
            const hash = await sha256(JSON.stringify(desc));
            await shaDB.put(hash, JSON.stringify(desc));
            // const prevData = await shaDB.get(prevHash, s);
            if (code) {
                shaDB.put(desc.code, code);
            }
            if (html) {
                shaDB.put(desc.html, html);
            }
            if (transpiled) {
                shaDB.put(desc.transpiled, transpiled);
            }
            if (versions) {
                shaDB.put(desc.versions, JSON.stringify(versions));
            }
            await shaDB.put(projectName, hash);
            Object.assign(saved, { html, code, transpiled, url });
            // console.log({ html, code, transpiled, url });
            toSave.semaphore = false;
            return url;
        }, 1000);
    }
    tryToSave(opts);
};
