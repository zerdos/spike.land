import { importScript } from "./importScript.js";
import { sha256 } from "./sha256.js";
import { getZkey } from "./data.js";
import { ipfsKV } from "./ipfsKV.js";
// import ReactDOMServer from "https://cdn.skypack.dev/react-dom/server";

export const shareItAsHtml = async ({ code, jsExport }) => {
  const mod = createJsBlob(code);

  const Element = (await import(mod)).default;

  const css = Array.from(
    window.document.querySelector("head > style[data-emotion=css]").sheet
      .cssRules,
  ).map((x) => x.cssText).filter((cssRule) =>
    HTML.includes(cssRule.substring(3, 8))
  ).join("\n  ");

  const { getHtml, getCodeForImport } = await import("./templates.js");

  let js = getCodeForImport(code);
  if (jsExport) {
    const jsLink = await saveJs("export default  " + getCodeForImport(code));
    js = `import app from "${jsLink}";
  app();`;
  } else {
    js = `(${js})()`;
  }

  const link = await saveHtml(
    getHtml({ HTML, css, js }),
  );

  return link;
};

function saveHtml(html) {
  return saveToIPFS(html, "text/html");
}

function saveJs(js) {
  return save(js, "application/javascript");
}
async function saveToIPFS(content, type) {
  const cid = await ipfsKV.add(content);
  return `https://ipfs.io/ipfs/${cid}`;
}

async function save(content, type) {
  const hash = await sha256(content);
  const request = new Request(
    "https://code.zed.vision",
    {
      body: content,
      method: "POST",
      headers: {
        "Content-Type": type + ";charset=UTF-8",
        "ZKEY": await getZkey(hash),
      },
    },
  );

  await fetch(request);

  return `https://code.zed.vision/${hash}`;
}

export function createJsBlob(code) {
  const blob = new Blob([code], { type: "application/javascript" });

  return URL.createObjectURL(blob);
}
