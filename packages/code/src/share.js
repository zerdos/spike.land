/**
 * 
 * @param {{
 * code: string
 * HTML: string
 * transpiled: string
 * }} props 
 */
export const shareItAsHtml = async ({ transpiled, code, HTML }) => {
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

  const res = await addAll(
    [
      { path: "/app/index.html", content: getHtml({ HTML, css }) },
      { path: "/app/app.js", content: transpiled },
      { path: "/app/app.tsx", content: code },
    ],
  );

  await Promise.all(res.map(
    /**
   * @param {{ CID: string; }} x
   */
    (x) => fetch(`https://zed.vision/ipfs/${x.CID}/`),
  ));

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

///import("./src/ipfsKV.js").then((mod)=>mod.ipfsKV).then(x=>x.add("diddiwohfqwyie",{onlyHash: true}))

/**
 * @param {{ path: string; content: any; }[]} files
 */
async function addAll(files) {
  const { getIpfsClient } = await import("./ipfsKV.js");
  const result = await (await getIpfsClient()).addAll(files);
  return result;
}
