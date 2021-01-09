import { sha256, shaDB } from "./db.js";
/**
 *
 * @param {{
 * code: string
 * html: string
 * transpiled: string
 * versions: any
 * }} props
 */
export const shareItAsHtml = async ({ transpiled, code, html, versions }) => {
    var _a;
    const bodyClass = String((_a = window.document.getElementById("zbody")) === null || _a === void 0 ? void 0 : _a.getAttribute("class"));
    let css = "";
    const cssRules = window.document.querySelector("head > style[data-emotion=css]");
    if (cssRules) {
        try {
            css = Array.from(
            // deno-lint-ignore ban-ts-comment
            // @ts-ignore
            window.document.querySelector("head > style[data-emotion=css]").sheet
                .cssRules).map((x) => x.cssText).filter((cssRule) => html.includes(cssRule.substring(3, 8))).join("\n  ").replace(`.${bodyClass}`, "body");
        }
        catch (e) {
            console.error({ e });
        }
    }
    const { getHtml, getEditorHTML } = await import("./templates.js");
    const allContent = [
        { path: "/app/index.html", content: getHtml({ html, css }) },
        { path: "/app/app.js", content: transpiled },
        { path: "/app/app.tsx", content: code },
        { path: "/app/edit/index.html", content: getEditorHTML(versions.code) },
        {
            path: "/app/versions.js",
            content: `export const v=JSON.parse("${JSON.stringify(versions)}");`,
        },
    ];
    const sha = await sha256(JSON.stringify(allContent));
    let rootUrl = await shaDB.get(sha, "string");
    if (rootUrl === null) {
        const res = await addAll(allContent);
        const appDir = res.find(
        /**
       * @param {{ path: string; }} x
       */
        (x) => x.path === "app");
        rootUrl = `https://code.zed.vision/ipfs/${appDir.CID}/`;
        shaDB.put(sha, rootUrl);
    }
    console.log(rootUrl);
    await fetch(rootUrl).then((x) => x.text());
    // await saveHtml(
    //   getHtml({ HTML, css, link: linkToCode }),
    // );
    return rootUrl;
};
///import("./src/ipfsKV.js").then((mod)=>mod.ipfsKV).then(x=>x.add("diddiwohfqwyie",{onlyHash: true}))
/**
 * @param {{ path: string; content: any; }[]} files
 */
async function addAll(files) {
    const { getIpfsClient } = await import("./ipfsKV.js");
    const result = await (await getIpfsClient()).addAll(files);
    return result;
}
