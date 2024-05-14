import { tsx } from "detective-typescript";

export async function ata(
  { code, originToUse, prettierJs }: {
    code: string;
    originToUse: string;
    prettierJs: (code: string) => Promise<string>;
  },
) {
  process.cwd = () => "/";

  // console.log(`ATA run: ${originToUse} ${code}`);

  const impRes: { [ref: string]: { url: string; content: string; ref: string } } = {};
  const npmPackages:{
    [pkg: string]: Boolean
  } = {};

  await ataRecursive(
    `/** @jsx jsx */
    import { jsx } from "@emotion/react";
    ${code}`,
    originToUse,
  );

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
            .replaceAll(versionNumbers, ""),
          url: impRes[t].url!
            .replace(vNumbers, subst)
            .split("/@types/")
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


declare namespace React {
  type ReactNode =
    | ReactElement
    | string
    | number
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined;
}

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
        })),
    )),
    ...extras,
  ];

  return [...new Set(extraLibs.map((x) => x.filePath))]
  .map((y) => extraLibs.find((p) => p.filePath === y))
  .sort((a, b) => (a?.filePath ?? "").localeCompare(b?.filePath ?? ""));


  async function ataRecursive(code: string, baseUrl: string) {
    // if (impRes[baseUrl]) return;
    let res = tsx(await prettierJs(code));

    const refParts = code.split(`/// <reference path="`);
    
    if (refParts.length > 1) {
      const [, ...refs] = refParts;
      
      res = [
        ...res,
        ...refs.map((r) => r.split(`"`)[0]).map((r) => {
          if (r.startsWith(".") || r.startsWith("https://")) {
            return r;
          } else {
            return new URL(r.slice(1), originToUse).toString();
          }
        }),
      ];
    }
    
    res = [...new Set(res)];

    await Promise.all(
      res.map(async (r: string) => {
        if (r.indexOf(".")===-1) {
          if (npmPackages[r]) return;
          npmPackages[r] = true;
        }

        let newBase;

        if (r.slice(0, 1) === ".") {
          newBase = new URL(r, baseUrl).toString();
        } else if (r.indexOf("https://") !== -1) {
          newBase = r;
        } else {
          if (r.indexOf("data:text/javascript") === -1) {
            try {
              const response = await fetch(`${originToUse}/*${r}`, { redirect: "follow" });
              const typescriptTypes = response.headers.get("X-typescript-types");
              
              if (typescriptTypes) {
                newBase = typescriptTypes;
              } else {
                const responseText = await response.text();
                const urlInText = responseText.split(`"`).find(
                  (x) => x.startsWith("https://") && x.indexOf(r) !== -1
                );
                newBase = urlInText || null;
              }
            } catch (error) {
              newBase = null;
            }
          } else {
            newBase = null;
          }
        }
        
        if (newBase === null) {
          return;
        }

 
        if (impRes[newBase] ) {
          return;
        }

        impRes[newBase] = { ref: r, url: newBase || "", content: "" };

        const url = newBase

        impRes[newBase].content = await (fetch(url, { redirect: "follow" }).then((dtsRes) => {
          impRes[newBase!].url = dtsRes.url;
          return dtsRes.text();
        }));

        const fileName = new URL(r.indexOf("d.ts") !== -1 || r.indexOf(".mjs") !== -1 ? r : `${r}/index.d.ts`, r.indexOf(".")!==-1?baseUrl:origin).toString()

        if (!impRes[fileName]) {
          impRes[fileName] = {
            url: fileName,
            content: `
              import mod from "${newBase}";
              export * from "${newBase}";
              export default mod;
              `,
            ref: r,
          };
          console.log(`virtual file: ${fileName}`, impRes[fileName]);  
        }



        if (impRes[newBase].content.length > 0) {
          try {
            await ataRecursive(impRes[newBase].content, impRes[newBase].url);
          } catch {
            console.error("ata error");
          }
        } 
  
  

  

    
      }),
    );
  }
}

Object.assign(self, { ata });
