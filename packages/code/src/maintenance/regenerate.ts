async function regenerate(
  apiKey: string,
  prefix: string,
  deleteIfRenderedHTmlDiffers = false,
) {
  const keys = await getKeys(apiKey, prefix);
  keys.map((x) => x.name).map(async (hash) => {
    const code = await getCode(hash);
    if (!code) return "";
    replaceWithEmpty("root");
    let transpiled;
    try {
      transpiled = transpileCode(code);

      const searchRegExp = /setInterval/gi;
      const replaceWith = "///";

      const searchRegExp2 = /debugger/gi;
      const replaceWith2 = "///";

      ReactDOM.unmountComponentAtNode(
        document.getElementById("root"),
      );
      restartCode(
        transpiled.replaceAll(searchRegExp, replaceWith).replaceAll(
          searchRegExp2,
          replaceWith2,
        ),
      );
      const html2 = document.getElementById("root")!.innerHTML;
      replaceWithEmpty("root");
      restartCode(
        codeTranspiled.replaceAll(searchRegExp, replaceWith).replaceAll(
          searchRegExp2,
          replaceWith2,
        ),
      );
      const html = document.getElementById("root")!.innerHTML;
      if (html !== html2) {
        console.log(
          {
            hash,
            code,
            html1: html,
            html2,
            transpiled1: codeTranspiled,
            transpiled2: transpiled,
          },
        );
        deleteIfRenderedHTmlDiffers && await deleteHash(apiKey, hash);
      }
    } catch (e) {
      console.error({ hash, code, transpiled });
    }
    //      console.log(transpileCode(code))
  });
}
