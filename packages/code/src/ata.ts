import { tsx } from "detective-typescript";

export async function ata({ code, originToUse, prettierJs }: { code: string; originToUse: string; prettierJs: (code: string) => Promise<string> }) {
  process.cwd = () => "/";

  console.log(`ATA run: ${originToUse} ${code}`);

  const impRes: { [ref: string]: { url: string | null; content: string; ref: string } } = {};

  await ata(`/** @jsx jsx */
    import { jsx } from "@emotion/react";
    ${code}`, originToUse);

  const versionNumbers = /@(\^)?\d+(\.)?\d+(\.)?\d+/gm;
  const vNumbers = /\/(v)[0-9]+\//gm;
  const subst = "/";

  Object.keys(impRes)
    .filter((x) => !(impRes[x].ref.startsWith(".") || impRes[x].ref.startsWith("https")))
    .forEach((x) => {
      Object.keys(impRes).forEach((t) => {
        impRes[t] = {
          ref: impRes[t].ref,
          content: impRes[t].content
            .split(impRes[x].url!)
            .join(x)
            .split("/dist/")
            .join("/")
            .split(`https://${originToUse}/${x}`)
            .join(impRes[x].ref)
            .replace(vNumbers, subst)
            .split("/@types/")
            .join("/")
            .split("/types/")
            .join("/")
            .replaceAll(versionNumbers, ""),
          url: impRes[t].url!
            .replace(vNumbers, subst)
            .split("/@types/")
            .join("/")
            .split("/types/")
            .join("/")
            .replaceAll(versionNumbers, "")
            .split("/dist/")
            .join("/"),
        };
      });
    });

  Object.keys(impRes).forEach((x) => {
    impRes[x] = {
      url: impRes[x].url!,
      ref: impRes[x].ref,
      content: impRes[x].content.split(originToUse).join(""),
    };
  });

  const extras = [
    {
      filePath: `${originToUse}/@emotion/react/css-prop.d.ts`,
      content: `import {} from 'react';
import { Interpolation } from '@emotion/serialize';
import { Theme } from '.';

declare module 'react' {
  interface Attributes {
    css?: Interpolation<Theme>;
  }
}`,
    },
    {
      filePath: `${originToUse}/@emotion/react/jsx-runtime.d.ts`,
      content: `export { EmotionJSX as JSX } from "./jsx-namespace";`,
    },
    {
      filePath: `${originToUse}/@emotion/react/jsx-dev-runtime.d.ts`,
      content: `export { EmotionJSX as JSX } from "./jsx-namespace";`,
    },
  ];

  const extraLibs = [
    ...(await Promise.all(
      Object.keys(impRes)
        .filter((x) => impRes[x].content.length && impRes[x].url)
        .map(async (x) => ({
          filePath: impRes[x].url!,
          content: (await prettierJs(impRes[x].content))
            .split(`import mod from "/`)
            .join(`import mod from "`)
            .split(`export * from "/`)
            .join(`export * from "`),
        }))
    )),
    ...extras,
  ];

  return [...new Set(extraLibs.map((x) => x.filePath))].map((y) => extraLibs.find((p) => p.filePath === y));

  async function ata(code: string, baseUrl: string) {
    let res = tsx(await prettierJs(code));

    const refParts = code.split(`/// <reference path="`);
    if (refParts.length > 1) {
      const [, ...refs] = refParts;
      res = [
        ...res,
        ...refs.map((r) => r.split(`"`)[0]).map((r) => (r.startsWith(".") || r.startsWith("https://") ? r : new URL(r.slice(1), originToUse).toString())),
      ];
    }

    res = [...new Set(res)];

    await Promise.all(
      res.map(async (r: string) => {
        const newBase =
          r.slice(0, 1) === "."
            ? new URL(r, baseUrl).toString()
            : r.indexOf("https://") !== -1
            ? r
            : (r.indexOf("data:text/javascript") === -1 &&
                (await fetch(`${originToUse}/*${r}?bundle`, { redirect: "follow" }).then(
                  async (res) => res.headers.get("X-typescript-types") || (await res.text()).split(`"`).find((x) => x.startsWith("https://") && x.indexOf(r) !== -1)
                ))) ||
              null;

        if (impRes[newBase!] || newBase === null) {
          return;
        }

        impRes[newBase] = { ref: r, url: newBase || "", content: "" };

        const url = new URL(newBase);

        impRes[newBase].content = await fetch(url, { redirect: "follow" }).then((dtsRes) => {
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

        impRes[new URL(r.indexOf("d.ts") !== -1 || r.indexOf(".mjs") !== -1 ? r : `${r}/index.d.ts`, baseUrl).toString()] =
          impRes[new URL(r.indexOf("d.ts") !== -1 || r.indexOf(".mjs") !== -1 ? r : `${r}/index.d.ts`, baseUrl).toString()] || {
            url: new URL(r.indexOf("d.ts") !== -1 || r.indexOf(".mjs") !== -1 ? r : `${r}/index.d.ts`, baseUrl).toString(),
            content: `
            import mod from "${newBase}";
            export * from "${newBase}";
            export default mod;
            `,
            ref: r,
          };
      })
    );
  }
}

Object.assign(self, { ata });