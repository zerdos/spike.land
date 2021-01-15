import { workBox } from "./workBox.js";
import { importCss } from "./importScript.js";
/**
 * @param {{ code?: string; shadb?: string; ipfs?: string; workbox: any; babel?: string; prettier?: string; uuid?: string; comlink?: string; editor?: string; DraggableWindow?: string; emotionRenderer?: string; }} v
 */
export async function openWindows(v) {
    const { WindowManager } = await import("https://unpkg.com/simple-window-manager@2.1.2/public/simple-window-manager.es.js");
    importCss(`https://blog.zed.vision/code/assets/app.css`, "appCss");
    importCss(`https://blog.zed.vision/code/assets/normalize.min.css`, "normalizeCss");
    workBox(v.workbox);
    const wm = new WindowManager({ backgroundWindow: "green" });
    wm.snap(false);
    const win = wm.createWindow({
        titlebarHeight: "42px",
        width: 720,
        closable: false,
        borderRadius: "0px",
        backgroundWindow: "#1e1e1e",
        height: 640,
        title: "React Live",
    });
    const isMobile = () => {
        if (typeof window === "undefined") {
            return false;
        }
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
            .test(window.navigator.userAgent);
    };
    win.content.innerHTML =
        `<div style="min-height: 700px;  min-width: 600px; height: ${isMobile() ? "2000px" : "100%"}; width:100%; display: block;" id="editor"></div>`;
    console.log("Runner");
    if (!isMobile()) {
        try {
            const element = window.document.querySelector("body > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > section");
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
}
