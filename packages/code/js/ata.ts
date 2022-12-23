import { tsx } from "../vendor/ts-detective.mjs";

export async function run(code: string, originToUse: string) {
  const impRes: {
    [ref: string]: { url: string | null; content: string; ref: string };
  } = {};

  console.log(
    await ata(
      `import * as JSX from "@emotion/react/jsx-runtime";
      import "@emotion/react/types/css-prop";
      
      ` + code,
      originToUse,
    ),
  );

  const versionNumbers = /@(\^)?\d+.\d+.\d+/gm;

  // let url = replaceMappings(filePath, replaceMaps).replaceAll(
  // versionNumbers,
  // ``,
  Object.keys(impRes).filter((x) => !(impRes[x].ref).startsWith(".") && !(impRes[x].ref).startsWith("https")).map((x) =>
    Object.keys(impRes).map((t) =>
      impRes[t] = {
        ref: impRes[t].ref,
        content: impRes[t].content.split(impRes[x].url!).join(x).split("/dist/")
          .join("/").split(
            "https://esm.sh/" + x,
          ).join(impRes[x].ref).split("esm.sh/v99/").join("esm.sh/").split(
            "/@types/",
          ).join("/").split("/types/").join(
            "/",
          ).replaceAll(
            versionNumbers,
            ``,
          ),
        url: impRes[t].url!.split("esm.sh/v99/").join("esm.sh/").split(
          "/@types/",
        ).join("/").split("/types/").join("/")
          .replaceAll(
            versionNumbers,
            ``,
          ).split("/dist/").join("/"),
      }
    )
  );

  Object.keys(impRes).map((x) =>
    impRes[x] = {
      url: impRes[x].url!.replace("esm.sh", location.host + "/node_modules"),
      ref: impRes[x].ref,
      content: impRes[x].content.split("esm.sh").join(location.host),
    }
  );

  const extraLibs = Object.keys(impRes).filter((x) => impRes[x].content.length && impRes[x].url)
    .map((x) => ({
      filePath: impRes[x].url!,
      content: impRes[x].content,
    }));

  return extraLibs;

  async function ata(code: string, baseUrl: string) {
    // const { tsx } = await import(`${location.origin}/live/w/index.js`);
    //  const detective = (await import("https://esm.sh/*detective-typescript?bundle&target=es2020&keep-names=true&dev=true")).default
    let res = tsx(code);

    const refParts = code.split(`/// <reference path="`);
    if (refParts.length > 1) {
      const [, ...refs] = refParts;
      res = [
        ...res,
        ...refs.map((r) => r.split(`"`)[0]).map((r) => (r.startsWith(".") || r.startsWith("https:/")) ? r : `./` + r),
      ];
    }

    res = [...new Set(res)];

    return await Promise.all(res.map(async (r: string) => {
      let newBase = (r.slice(0, 1) === ".")
        ? new URL(r, baseUrl).toString()
        : r.indexOf("https://") !== -1
        ? r
        : await fetch(`https://esm.sh/${r}`, { redirect: "follow" }).then(
          (res) => res.headers.get("x-typescript-types"),
        );

      // const rR = r.slice(0, 1) ==="."? newBase;
      if (impRes[newBase!]) {
        return true;
      }

      if (newBase === null) {
        return;
      }
      if (newBase.indexOf(location.origin) !== -1) {
        return true;
      }
      console.log("processing: " + r);

      impRes[newBase] = { ref: r, url: newBase || "", content: "" };

      impRes[newBase].content = await fetch(newBase, { redirect: "follow" })
        .then((dtsRes) => {
          impRes[newBase!].url = dtsRes.url;
          return dtsRes.text();
        });

      if (impRes[newBase].content.length > 0) {
        await ata(impRes[newBase].content, impRes[newBase].url!);
      }
      return true;
    }));
  }
}
