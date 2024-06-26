export async function ata({
  code,
  originToUse,
  prettierJs,
  tsx,
}: {
  code: string;
  originToUse: string;
  prettierJs: (code: string) => Promise<string>;
  tsx: (code: string) => Promise<string[]>;
}) {
  const impRes: Record<string, { url: string; content: string; ref: string }> = {};

  await ataRecursive(
    `/** @jsx jsx */
    import { jsx } from "@emotion/react";
    ${code}`,
    originToUse,
  );

  const versionNumbers = /@(\^)?\d+(\.)?\d+(\.)?\d+/gm;
  const vNumbers = /\/(v)[0-9]+\//gm;
  const subst = "/";

  // Process import results to clean up paths and references
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

  // Replace origin in URLs
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

  // Deduplicate and sort extra libs
  return [...new Set(extraLibs.map((x) => x.filePath))]
    .map((y) => extraLibs.find((p) => p.filePath === y))
    .sort((a, b) => (a?.filePath ?? "").localeCompare(b?.filePath ?? ""));

  async function ataRecursive(code: string, baseUrl: string) {
    let res = await tsx(await prettierJs(code));

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
        if (!impRes[r]) {
          let newBase: string | null | undefined = null;

          if (r.startsWith(".")) {
            newBase = new URL(r, baseUrl).toString();
          } else if (r.startsWith("https://")) {
            newBase = r;
          } else {
            try {
              const response = await fetch(`${originToUse}/*${r}`, {
                redirect: "follow",
              });
              if (!response.ok) throw new Error("Failed to fetch");
              const typescriptTypes = response.headers.get(
                "X-typescript-types",
              );

              newBase = typescriptTypes
                || await extractUrlFromResponse(response, r);
            } catch (error) {
              const response = await fetch(`${originToUse}/${r}`, {
                redirect: "follow",
              });
              const typescriptTypes = response.headers.get(
                "X-typescript-types",
              );

              newBase = typescriptTypes || `${originToUse}/${r}`;
            }
          }

          if (newBase) {
            await handleNewBase(newBase, r, baseUrl);
          }
        }
      }),
    );
  }

  async function extractUrlFromResponse(
    response: Response,
    ref: string,
  ): Promise<string | null> {
    const responseText = await response.text();
    return responseText.split(`"`).find((x) => x.startsWith("https://") && x.includes(ref)) || null;
  }

  async function handleNewBase(newBase: string, ref: string, baseUrl: string) {
    if (!impRes[newBase]) {
      impRes[newBase] = { ref, url: newBase, content: "" };

      impRes[newBase].content = await fetch(newBase, { redirect: "follow" })
        .then((dtsRes) => {
          impRes[newBase].url = dtsRes.url;
          return dtsRes.text();
        });

      const fileName = new URL(
        ref.includes("d.ts") || ref.includes(".mjs")
          ? ref
          : `${ref}/index.d.ts`,
        ref.startsWith(".") ? baseUrl : originToUse,
      ).toString();

      if (!impRes[fileName]) {
        impRes[fileName] = {
          url: fileName,
          content: `
            import mod from "${newBase}";
            export * from "${newBase}";
            export default mod;
          `,
          ref,
        };
        console.log(`virtual file: ${fileName}`, impRes[fileName]);
      }

      if (impRes[newBase].content.length > 0) {
        try {
          await ataRecursive(impRes[newBase].content, impRes[newBase].url);
        } catch (error) {
          console.error("ata error", error);
        }
      }
    }
  }
}

Object.assign(self, { ata });
