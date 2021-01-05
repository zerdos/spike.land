/**
 * @param {string} code
 */
async function transpile(code) {
    const { transpileCode } = await import("./transpile.js");
    return transpileCode(code, false);
}
function getSession() {
    const session = {
        unmount: () => { },
        hydrated: false,
        preRendered: false,
        lastErrors: 0,
        rootElement: null,
        div: window.document.createElement("div"),
        HTML: "",
        devtoolHash: "",
        ipfs: 0,
        transpiled: "",
        code: "",
    };
    return session;
}
/**
 *
 * @param {string} version
 */
const workBox = async (version) => {
    // deno-lint-ignore ban-ts-comment
    //@ts-ignore
    const { Workbox } = await import(`https://storage.googleapis.com/workbox-cdn/releases/${version}/workbox-window.prod.mjs`);
    if ("serviceWorker" in window.navigator) {
        const wb = new Workbox("dist/sw.js");
        wb.register();
    }
};
/**
  * @param {{ document: Document; open: (url: string)=>void; }} _w
 */
export async function run(mode = "window", _w) {
    const getVersions = (await import("./versions.js")).default;
    const v = getVersions();
    const { searchParams, pathname } = new URL(window.location.href);
    const maybeRoute = pathname.substr(1);
    const isKey = [...maybeRoute].filter((x) => x < "0" || x > "f").length === 0;
    if (isKey) {
        import("./hash.js").then(({ hash }) => hash(`https://zed.vision/${pathname}`, false)).then((hash) => console.log({ hash }));
    }
    const { formatter } = await import("./formatter.js");
    const { importScript, importCss } = await import("./importScript.js");
    importCss(`https://unpkg.com/@zedvision/code@${v.code}/assets/app.css`, "appCss");
    importCss(`https://unpkg.com/@zedvision/code@${v.code}/assets/normalize.min.css`, "normalizeCss");
    const { WindowManager } = await importScript("https://unpkg.com/simple-window-manager@2.1.2/public/simple-window-manager.min.js");
    workBox(v.workbox);
    // or const WindowManager = require('simple-window-manager').WindowManager
    // this is the window manager with one of the default options changed
    const wm = new WindowManager.WindowManager({ backgroundWindow: "green" });
    // enable window snapping to screen edges and other windows when moving
    wm.snap(false);
    // create a window
    const win = wm.createWindow({
        width: 720,
        height: 640,
        style: { backgroundWindow: "#1e1e1e" },
        title: "React Live",
    });
    // set content of window
    //win.content.style.margin = '0[[c'
    const isMobile = () => {
        if (typeof window === "undefined")
            return false;
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
            .test(window.navigator.userAgent);
    };
    const { document, open } = _w;
    win.content.innerHTML =
        `<div style="min-height: 700px;  min-width: 600px; height: ${isMobile() ? "2000px" : "100%"}; width:100%; display: block;" id="editor"></div>`;
    console.log("Runner");
    if (!isMobile()) {
        try {
            const element = document.querySelector("body > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > section");
            if (element !== null) {
                // deno-lint-ignore ban-ts-comment
                //@ts-ignore
                element.style.overflow = "";
            }
        }
        catch (e) {
            console.error({ e });
        }
    }
    const session = getSession();
    try {
        const { getCodeToLoad } = await import("./data.js");
        const { code, transpiled, html, versions } = await getCodeToLoad();
        session.code = code;
        session.transpiled = transpiled || (await transpile(code));
        session.div.innerHTML = html;
    }
    catch (e) {
        console.error({ e, message: "couldn't start" });
        return;
    }
    session.transpiled = session.transpiled || await transpile(session.code);
    if (mode === "window") {
        const onShare = async () => {
            const { shareItAsHtml } = await import("./share.js");
            const link = await shareItAsHtml({
                code: session.code,
                transpiled: session.transpiled,
                HTML: session.HTML,
            });
            console.log({ link });
            open(link);
        };
        const { renderDraggableWindow } = await import("./DraggableWindow.js");
        await renderDraggableWindow({ onShare }, v.emotionRenderer);
        const zbody = window.document.getElementById("zbody");
        if (zbody !== null) {
            zbody.appendChild(session.div);
        }
        if (session.HTML)
            session.div.innerHTML = session.HTML;
    }
    const { renderEmotion } = await import(v.emotionRenderer);
    const transpiled = await transpile(session.code);
    await restartCode(transpiled);
    const startMonaco = (await import(v.editor)).default;
    const container = document.getElementById("editor");
    const modules = await startMonaco(
    /**
     * @param {any} code
     */
    {
        language: "typescript",
        container: container,
        code: session.code,
        /**
       *
       * @param {string} code
       */
        onChange: (code) => runner(code),
    });
    /**
     * @param {string} c
     */
    async function runner(c) {
        const cd = await (formatter(c));
        try {
            const transpiled = await transpile(cd);
            if (session.transpiled === transpiled && transpiled !== "")
                return;
            let restartError = false;
            ///yellow
            if (transpiled.length && session.lastErrors === 0) {
                restartError = await restartCode(transpiled);
            }
            const err = await getErrors(cd);
            if (restartError) {
                err.push({ messageText: "Error while starting the app. Check the console!" });
            }
            if (err.length)
                console.log({ err });
            if (session.lastErrors && err.length === 0)
                restartCode(transpiled);
            session.lastErrors = err.length;
            // const errorDiv = document.getElementById("error");
            if (err.length === 0 && transpiled.length) {
                session.code = await formatter(cd);
                if (session.transpiled !== transpiled) {
                    session.transpiled = transpiled;
                    const { saveCode } = await import("./data.js");
                    await saveCode({
                        code: session.code,
                        transpiled: session.transpiled,
                        html: session.HTML,
                        versions: session.devtoolHash,
                    });
                }
            }
            else {
                const { diff } = await import(`https://unpkg.com/@zedvision/diff@${v.diff}/src/diff.js`);
                const slices = await diff(session.code, cd);
                if (slices.c.length <= 3) {
                    session.lastErrors = 0;
                    return;
                }
                if (slices.c.length == 4) {
                    session.lastErrors = 0;
                    modules.monaco.editor.setTheme("hc-black");
                    return;
                }
                console.error(err[0].messageText.toString());
                // errorDiv.innerHTML = err[0].messageText.toString();
                return;
            }
            modules.monaco.editor.setTheme("vs-dark");
        }
        catch (err) {
            modules.monaco.editor.setTheme("vs-light");
            setTimeout(() => {
                modules.monaco.editor.setTheme("hc-black");
            }, 50);
            console.error(err);
        }
    }
    /**
     * @param {string} code
     */
    async function getErrors(code) {
        if (!modules || !modules.monaco) {
            return [{ messageText: "Error with the error checking. Try to reload!" }];
        }
        const { monaco } = modules;
        const { sha256 } = await import(`https://unpkg.com/@zedvision/sha256@${v.sha256}/sha256.js`);
        const shaCode = await sha256(code);
        const filename = `file:///${shaCode}.tsx`;
        const uri = monaco.Uri.parse(filename);
        const model = monaco.editor.getModel(uri) ||
            await monaco.editor.createModel(code, "typescript", uri);
        const worker = await monaco.languages.typescript.getTypeScriptWorker();
        const client = await worker(model.uri);
        const diag = client.getSemanticDiagnostics(filename);
        const comp = client.getCompilerOptionsDiagnostics(filename);
        const syntax = client.getSyntacticDiagnostics(filename);
        const fastError = await Promise.race([diag, comp, syntax]);
        model.dispose();
        return [
            ...fastError,
        ];
    }
    /**
     * @param {string} transpiled
     */
    async function restartCode(transpiled) {
        session.HTML = "";
        let hadError = false;
        if (typeof transpiled !== "string" || transpiled === "") {
            // console.log(transpiled.error);
            hadError = true;
            return hadError;
        }
        const codeToHydrate = mode === "window"
            ? transpiled.replace("body{", "#zbody{")
            : transpiled;
        const root = document.createElement("div");
        const Element = (await import(createJsBlob(codeToHydrate))).default;
        session.unmount();
        session.unmount = renderEmotion(Element(), root);
        const zbody = document.getElementById("zbody");
        zbody && zbody.children[0].replaceWith(root);
        session.HTML = session.div.innerHTML;
        return !!session.HTML;
        /**
         * @param {BlobPart} code
         */
        function createJsBlob(code) {
            const blob = new Blob([code], { type: "application/javascript" });
            return URL.createObjectURL(blob);
        }
    }
}
