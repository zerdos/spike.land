var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { sha256, shaDB } from "./db.js";
import { ipfsClient } from "./ipfsClient.js";
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
            content: `export const v=JSON.parse('${JSON.stringify(versions)}');`,
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
        if (typeof appDir === "undefined")
            return null;
        rootUrl = `https://code.zed.vision/ipfs/${appDir.CID}/`;
        const { pathname } = new URL(window.location.href);
        if (pathname.endsWith("/edit/") || pathname.endsWith("/edit")) {
            // deno-lint-ignore no-undef
            history.pushState({}, "", `/ipfs/${appDir.CID}/edit/`);
        }
        shaDB.put(sha, rootUrl);
    }
    console.log(rootUrl);
    await fetch(rootUrl).then((x) => x.text());
    // await saveHtml(
    //   getHtml({ HTML, css, link: linkToCode }),
    // );
    return rootUrl;
};
/**
 * @param {{ path: string; content: any; }[]} files
 */
async function addAll(files) {
    var e_1, _a;
    const res = [];
    try {
        for (var _b = __asyncValues(ipfsClient.addAll(files)), _c; _c = await _b.next(), !_c.done;) {
            const result = _c.value;
            const { path, cid } = result;
            const CID = cid.toString();
            res.push({ path, CID });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return res;
}
