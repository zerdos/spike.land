import { getZkey } from "./data.js";

export const shareItAsHtml = async ({ code, HTML }) => {
  const bodyClass = String(
    window.document.getElementById("zbody")?.getAttribute("class"),
  );

  const css = Array.from(
    window.document.querySelector("head > style[data-emotion=css]").sheet
      .cssRules,
  ).map((x) => x.cssText).filter((cssRule) =>
    HTML.includes(cssRule.substring(3, 8))
  ).join("\n  ").replace(`.${bodyClass}`, "body");

  const { getHtml } = await import("./templates.js");

  const linkToCode = await saveToIPFS(code, "application/javascript");

  console.log({
    HTML,
    linkToCode,
    css,
    code,
  });

  const link = await saveHtml(
    getHtml({ HTML, css, link: linkToCode }),
  );

  return link;
};

function saveHtml(html) {
  return saveToIPFS(html, "text/html");
}

let ipfsKV;
async function saveToIPFS(content, type) {
  ipfsKV = ipfsKV || (await import("./ipfsKV.js")).ipfsKV;
  const cid = await ipfsKV.add(
    URL.createObjectURL(new Blob([content], { type })), {path:type==="text/html"?"/index.html":"/app.js"}
  );
  return `https://ipfs.io/ipfs/${cid}`;
}

async function save(content, type) {
  const { sha256 } = await import(
    "https://unpkg.com/@zedvision/sha256@10.12.14/sha256.js"
  );

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
