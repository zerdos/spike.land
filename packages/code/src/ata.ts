import { tsx } from "detective-typescript";

export async function ata(
  { code, originToUse, prettierJs }: {
    code: string;
    originToUse: string;
    prettierJs: (code: string) => string;
  },
) {
  console.log(`ATA run: ${originToUse} ${code}`);

  const impRes: {
    [ref: string]: { url: string | null; content: string; ref: string };
  } = {};

  // console.log(
  await ata(
    `/** @jsx jsx */
      import { jsx } from "@emotion/react/jsx-runtime";
      import "@emotion/react/types/css-prop";
      import "@types/react/global.d.ts";

      
      ${code}`,
    originToUse,
  );

  // );

  const versionNumbers = /@(\^)?\d+(\.)?\d+(\.)?\d+/gm;

  // let url = replaceMappings(filePath, replaceMaps).replaceAll(
  // versionNumbers,
  // ``,

  const vNumbers = /\/(v)[0-9]+\//gm;
  const subst = "\/";

  // The substituted value will be contained in the result variable

  Object.keys(impRes).filter((x) => !((impRes[x].ref).startsWith(".") || (impRes[x].ref).startsWith("https"))).map((
    x,
  ) =>
    Object.keys(impRes).map((t) =>
      impRes[t] = {
        ref: impRes[t].ref,
        content: impRes[t].content.split(impRes[x].url!).join(x).split("/dist/")
          .join("/").split(
            `https://esm.sh/${x}`,
          ).join(impRes[x].ref).replace(vNumbers, subst).split(
            "/@types/",
          ).join("/").split("/types/").join(
            "/",
          ).replaceAll(
            versionNumbers,
            "",
          ),
        url: impRes[t].url!.replace(vNumbers, subst).split(
          "/@types/",
        ).join("/").split("/types/").join("/")
          .replaceAll(
            versionNumbers,
            "",
          ).split("/dist/").join("/"),
      }
    )
  );

  Object.keys(impRes).map((x) =>
    impRes[x] = {
      url: impRes[x].url!.replace("esm.sh", location.host),
      ref: impRes[x].ref,
      content: impRes[x].content.split("https://esm.sh").join("").split(
        "esm.sh",
      ).join(""),
    }
  );

  const extras = [{
    filePath: `${location.origin}/@emotion/react/css-prop.d.ts`,
    content: `import {} from 'react'
  import { Interpolation } from '@emotion/serialize'
  import { Theme } from '.'
  
  declare module 'react' {
    interface Attributes {
      css?: Interpolation<Theme>
    }
  }`,
  }, {
    filePath: `${location.origin}/@emotion/react/jsx-runtime.d.ts`,
    content: `export { EmotionJSX as JSX } from "./jsx-namespace";`,
  }];

  const extraLibs = [
    ...Object.keys(impRes).filter((x) => impRes[x].content.length && impRes[x].url)
      .map((x) => ({
        filePath: impRes[x].url!,
        content: prettierJs(impRes[x].content).split(`import mod from "/`).join(
          `import mod from "`,
        ).split(
          `export * from "/`,
        ).join(
          `export * from "`,
        ),
      })),
    ...extras,
  ];

  return [...new Set(extraLibs.map((x) => x.filePath))].map((y) => extraLibs.find((p) => p.filePath === y));

  async function ata(code: string, baseUrl: string) {
    // const { tsx } = await import(`${location.origin}/live/w/index.js`);
    //  const detective = (await import("https://esm.sh/*detective-typescript?bundle&target=es2020&keep-names=true&dev=true")).default
    // let res = tsx(prettierJs(prettierJs(code).split(`/// <reference path="`).map(x=> {
    //   const xx = x.split(`"`);
    //   if(xx.length>1 && xx[1]) {
    //     xx[1] = xx[1].replace(">", ";");
    //   }

    //   return xx.join(`"`);
    // }).join(`; import "`)));

    let res = tsx(prettierJs(code));

    // let res = tsx(prettierJs(code));

    const refParts = code.split(`/// <reference path="`);
    if (refParts.length > 1) {
      const [, ...refs] = refParts;
      res = [
        ...res,
        ...refs.map((r) => r.split(`"`)[0]).map((r) =>
          (r.startsWith(".") || r.startsWith("https:/"))
            ? r
            : new URL(r.slice(1), originToUse).toString()
        ),
        //     : new URL(`./` + r, baseUrl).toString()
        // ),
      ];
    }

    res = [...new Set(res)];

    return await Promise.all(res.map(async (r: string) => {
      const newBase = (r.slice(0, 1) === ".")
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
        return true;
      }
      if (newBase.indexOf(location.origin) !== -1) {
        return true;
      }

      // console.log("processing: " + r);

      impRes[newBase] = { ref: r, url: newBase || "", content: "" };

      const url = new URL(
        newBase.split("https://esm.sh").join(self.location.origin),
      );

      impRes[newBase].content = await fetch(url, { redirect: "follow" })
        .then((dtsRes) => {
          // const u = new URL(dtsRes.url, origin)

          // impRes[newBase!].url =    dtsRes.url;
          impRes[newBase!].url = dtsRes.url;
          return dtsRes.text();
        });

      if (impRes[newBase].content.length > 0) {
        try {
          await ata(impRes[newBase].content, impRes[newBase].url!);
        } catch {
          try {
            await ata(impRes[newBase].content, impRes[newBase].url!);
          } catch {
            console.error("ata error");
          }
        }
      }

      // impRes[new URL(r.indexOf("d.ts") !== -1 ? r : r + "/index.ts", baseUrl).toString()] = {
      //   url: new URL(r.indexOf("d.ts") !== -1 ? r : r + "/index.ts", baseUrl).toString(),
      //   content: `/// <reference path="${newBase}" />`,
      //   ref: r,
      // };
      impRes[
        new URL(r.indexOf("d.ts") !== -1 ? r : `${r}/index.d.ts`, baseUrl)
          .toString()
      ] = impRes[
        new URL(r.indexOf("d.ts") !== -1 ? r : `${r}/index.d.ts`, baseUrl)
          .toString()
      ]
        || {
          url: new URL(
            r.indexOf("d.ts") !== -1 ? r : `${r}/index.d.ts`,
            baseUrl,
          ).toString(),
          content: `
          import mod from "${newBase}";
          export * from "${newBase}";
          export default mod;
          `,
          ref: r,
        };
      return true;
    }));
  }
}

Object.assign(self, { ata });
