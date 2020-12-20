import { importScript } from "./importScript.js";
import { getDepts } from "./templates.js";
import { sha256 } from "./sha256.js";
import { getZkey } from "./data.js";

export const ipfs = async () => {
  await importScript("https://unpkg.com/ipfs@0.52.3/dist/index.min.js");
};

export const shareItAsHtml = async ({ code, jsExport }) => {
  const debts = getDepts(code);

  for (let i = 0; i < debts.length; i++) {
    await importScript(debts[i]);
  }

  const renderToString = new Function(
    `return function(){
        let DefaultElement;
        ${code}
        return ReactDOMServer.renderToString(jsx(DefaultElement));
    }`,
  )();
  const HTML = renderToString();

  const css = Array.from(
    window.document.querySelector("head > style[data-emotion=css]").sheet
      .cssRules,
  ).map((x) => x.cssText).filter((cssRule) =>
    HTML.includes(cssRule.substring(3, 8))
  ).join("\n  ");

  const { getHtml, getCodeForImport } = await import("./templates.js");

  let js = getCodeForImport(code);
  if (jsExport) {
    const jsLink = await saveJs(getCodeForImport(code));
    js = `import app from "${jsLink}";
  app();`;
  }

  const link = await saveHtml(
    getHtml({ HTML, css, js }),
  );

  return link;
};

function saveHtml(html) {
  return save(html, "text/html");
}

function saveJs(js) {
  return save(js, "application/javascript");
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
