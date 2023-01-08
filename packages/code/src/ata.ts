import { tsx } from "detective-typescript";
import { prettierJs } from "./prettierEsm";

import fetchBuilder from "fetch-retry";
import originalFetch from "isomorphic-fetch";

self.fetch = fetchBuilder(originalFetch, {
  retries: 3,
  retryDelay: 800,
});

export { prettierJs };

export async function run(
  { code, originToUse }: { code: string; originToUse: string },
) {
  console.log(`ATA run: ${originToUse} ${code}`);

  const impRes: {
    [ref: string]: { url: string | null; content: string; ref: string };
  } = {};

  // console.log(
  await ata(
    `/** @jsx jsx */
      import { jsx } from '@emotion/react'
      import "@emotion/react/types/css-prop";
      import "@types/react/global.d.ts";

      
      ` + code,
    originToUse,
  );

  // );

  const versionNumbers = /@(\^)?\d+.\d+.\d+/gm;

  // let url = replaceMappings(filePath, replaceMaps).replaceAll(
  // versionNumbers,
  // ``,

  const vNumbers = /\/(v)[0-9]+\//gm;
  const subst = `\/`;

  // The substituted value will be contained in the result variable

  Object.keys(impRes).filter((x) => !(impRes[x].ref).startsWith(".") && !(impRes[x].ref).startsWith("https")).map((x) =>
    Object.keys(impRes).map((t) =>
      impRes[t] = {
        ref: impRes[t].ref,
        content: impRes[t].content.split(impRes[x].url!).join(x).split("/dist/")
          .join("/").split(
            "https://esm.sh/" + x,
          ).join(impRes[x].ref).replace(vNumbers, subst).split(
            "/@types/",
          ).join("/").split("/types/").join(
            "/",
          ).replaceAll(
            versionNumbers,
            ``,
          ),
        url: impRes[t].url!.replace(vNumbers, subst).split(
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
      url: impRes[x].url!.replace("esm.sh", location.host),
      ref: impRes[x].ref,
      content: impRes[x].content.split("https://esm.sh").join("").split(
        `esm.sh`,
      ).join(""),
    }
  );

  const extras = [{
    filePath: location.origin + "/@emotion/react/css-prop.d.ts",
    content: `import {} from 'react'
  import { Interpolation } from '@emotion/serialize'
  import { Theme } from '.'
  
  declare module 'react' {
    interface Attributes {
      css?: Interpolation<Theme>
    }
  }`,
  }, {
    filePath: location.origin + "/@emotion/react/jsx-runtime.d.ts",
    content: `export { EmotionJSX as JSX } from "./jsx-namespace";`,
  }];

  const extraLibs = [
    ...Object.keys(impRes).filter((x) => impRes[x].content.length && impRes[x].url)
      .map((x) => ({
        filePath: impRes[x].url!,
        content: impRes[x].content,
      })),
    ...extras,
  ];

  return [...new Set(extraLibs.map((x) => x.filePath))].map((y) => extraLibs.find((p) => p.filePath === y));

  async function ata(code: string, baseUrl: string) {
    // const { tsx } = await import(`${location.origin}/live/w/index.js`);
    //  const detective = (await import("https://esm.sh/*detective-typescript?bundle&target=es2020&keep-names=true&dev=true")).default
    let res = tsx(await prettierJs(code));

    const refParts = code.split(`/// <reference path="`);
    if (refParts.length > 1) {
      const [, ...refs] = refParts;
      res = [
        ...res,
        ...refs.map((r) => r.split(`"`)[0]).map((r) =>
          (r.startsWith(".") || r.startsWith("https:/"))
            ? r
            : new URL(`./` + r, baseUrl).toString()
        ),
      ];
    }

    res = [...new Set(res)];

    return await Promise.all(res.map(async (r: string) => {
      let newBase = (r.slice(0, 1) === ".")
        ? new URL(r, baseUrl).toString()
        : r.indexOf("https://") !== -1
        ? r
        : await fetch(`${location.origin}/${r}`, { redirect: "follow" }).then(
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
      // console.log("processing: " + r);

      impRes[newBase] = { ref: r, url: newBase || "", content: "" };

      impRes[newBase].content = await fetch(newBase, { redirect: "follow" })
        .then((dtsRes) => {
          const u = new URL(dtsRes.url, origin);
          impRes[newBase!].url = u.toString();
          return dtsRes.text(); // .then(z => importMapReplace(z, u.toString(), origin, false));
        });

      if (impRes[newBase].content.length > 0) {
        await ata(impRes[newBase].content, impRes[newBase].url!);
      }
      return true;
    }));
  }
}
