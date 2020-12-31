import { getZkey } from "./data.js";
import { getIpfsClient } from "./ipfsKV.js";

/**
 * 
 * @param {{
 * code: string
 * HTML: string
 * }} props 
 */
export const shareItAsHtml = async ({ code, HTML }) => {
  const bodyClass = String(
    window.document.getElementById("zbody")?.getAttribute("class"),
  );

  let css = "";
  const cssRules = window.document.querySelector(
    "head > style[data-emotion=css]",
  );
  if (cssRules) {
    try {
      css = Array.from(
        // @ts-ignore
        window.document.querySelector("head > style[data-emotion=css]").sheet
          .cssRules,
      ).map((x) => x.cssText).filter((cssRule) =>
        HTML.includes(cssRule.substring(3, 8))
      ).join("\n  ").replace(`.${bodyClass}`, "body");
    } catch {
    }
  }

  const { getHtml } = await import("./templates.js");

  const linkToCode = await saveToIPFS(code, "application/javascript");

  console.log({
    HTML,
    linkToCode,
    css,
    code,
  });

  const res = await addAll(
    [
      { path: "/app/index.html", content: getHtml({ HTML, css }) },
      { path: "/app/app.js", content: code },
    ],
  );

  const appDir = res.find(
    /**
     * @param {{ path: string; }} x
     */
    (x) => x.path === "app",
  );

  // await saveHtml(
  //   getHtml({ HTML, css, link: linkToCode }),
  // );

  return `https://zed.vision/ipfs/${appDir.CID}/`;
};

/**
 * @param {any} html
 */
function saveHtml(html) {
  return saveToIPFS(html, "text/html");
}

///import("./src/ipfsKV.js").then((mod)=>mod.ipfsKV).then(x=>x.add("diddiwohfqwyie",{onlyHash: true}))

/**
 * @param {any} content
 * @param {string} type
 */
async function saveToIPFS(content, type) {
  const { getIpfsClient } = await import("./ipfsKV.js");
  const cid = await (await getIpfsClient()).add(content, { onlyHash: false });
  return `https://zed.vision/ipfs/${cid}`;
}

/**
 * @param {{ path: string; content: any; }[]} files
 */
async function addAll(files) {
  const { getIpfsClient } = await import("./ipfsKV.js");
  const result = await (await getIpfsClient()).addAll(files);
  return result;
}
