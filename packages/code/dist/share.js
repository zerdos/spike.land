export const shareItAsHtml = async ({ code }) => {
  const { getDepts } = await import("./templates.js");
  const { importScript } = await import("./importScript.js");

  // const debts = getDepts();

  // for (let i = 0; i < debts.length; i++) {
  //   await importScript(debts[i]);
  // }

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

  const link = await saveHtml(
    getHtml({ HTML, css, js: getCodeForImport(code) }),
  );

  return link;
};

async function saveHtml(html) {
  const { sha256 } = await import("./sha256.js");
  const { getZkey } = await import("./data.js");

  const hash = await sha256(html);
  const request = new Request(
    "https://code.zed.vision",
    {
      body: html,
      method: "POST",
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "ZKEY": await getZkey(hash),
      },
    },
  );

  await fetch(request);

  return `https://zed.vision/${hash}`;
}
