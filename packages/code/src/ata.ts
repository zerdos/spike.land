import { myATA } from "./my-ata";
import { QueuedFetch } from "./QueuedFetch";

const queuedFetch = new QueuedFetch(3, 1000);

export async function ata({
  code,
  originToUse,
  tsx,
}: {
  code: string;
  originToUse: string;
  tsx: (code: string) => Promise<string[]>;
}): Promise<{
  filePath: string;
  content: string;
}[]> {
  let thisATA: { content: string; filePath: string }[] = [];

  const impRes: Record<string, { url: string; content: string; ref: string }> = {};

  let res = (await tsx(code)).filter((x) => x.includes("@/"));
  try {
    await Promise.all(
      res.map(async (r) => {
        const resp = await queuedFetch.fetch(`${originToUse}/${r}.d.ts`);
        const content = await resp.text();
        impRes[r] = {
          url: resp.url,
          ref: "",
          content,
        };
        await ataRecursive(content, new URL(resp.url + "/../").toString());
      }),
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
              // .split("/dist/")
              // .join("/")
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
              .replaceAll(versionNumbers, ""),
            // .split("/dist/")
            // .join("/"),
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
            filePath: impRes[x].url!.replace("https://unpkg.com", originToUse)
              .replace(originToUse, ""),
            content: impRes[x].content
              .split(`import mod from "/`)
              .join(`import mod from "`)
              .split(`export * from "/`)
              .join(`export * from "`),
          })),
      )),
      ...extras,
    ];

    thisATA = [...new Set(extraLibs.map((x) => x.filePath))].map((y) => extraLibs.find((p) => p.filePath === y))
      .sort((a, b) => (a?.filePath ?? "").localeCompare(b?.filePath ?? "")).map(
        (c) => ({
          content: c!.content,
          filePath: c!.filePath.replace(originToUse, "").replace(
            originToUse,
            "",
          ),
        }),
      );
  } catch (error) {
    console.error("error", error);
  }

  const ataBIG = await myATA(code);

  return [...ataBIG, ...thisATA];

  async function ataRecursive(code: string, baseUrl: string) {
    let res = await tsx(code);

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
          await tryToExtractUrlFromPackageJson(r);
          if (impRes[r]) return;

          let newBase: string | null | undefined = null;

          if (r.startsWith(".")) {
            newBase = new URL(`${baseUrl}/${r}`).toString();
          } else if (r.startsWith("https://")) {
            newBase = r;
          } else {
            try {
              const response = await queuedFetch.fetch(`${originToUse}/*${r}`, {
                redirect: "follow",
              });

              if (!response.ok) throw new Error("Failed to queuedFetch");

              const typescriptTypes = response.headers.get(
                "X-typescript-types",
              );

              newBase = typescriptTypes
                || await extractUrlFromResponse(response, r);
              if (newBase) newBase = new URL(newBase).toString();
            } catch (error) {
              let response;
              try {
                response = await queuedFetch.fetch(`${originToUse}/${r}`, {
                  redirect: "follow",
                });
              } catch {
                console.error("error queuedFetching", {
                  error,
                  r,
                  originToUse,
                });
              }

              if (!response || !response.ok) {
                response = await queuedFetch.fetch(`${originToUse}/${r}.d.ts`, {
                  redirect: "follow",
                });
              }

              const typescriptTypes = response.headers.get(
                "X-typescript-types",
              );

              newBase = typescriptTypes || response.url;
              const newBaseIsDownloadable = await queuedFetch.fetch(newBase)
                .then((res) => res.ok);
              if (!newBaseIsDownloadable) {
                newBase = null;
              }
            }
          }

          if (newBase === null || newBase === undefined) {
            await tryToExtractUrlFromPackageJson(r);
          } else {
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

    // importMapReplace(
    //   await prettierJs(await response.text()),
    //   originToUse,
    // );
    return responseText.split(`"`).find((x) => x.startsWith("https://") && x.includes(ref)) || null;
  }

  async function tryToExtractUrlFromPackageJson(npmPackage: string) {
    if (impRes[npmPackage]) return;
    if (npmPackage.includes("https://")) return;
    if (npmPackage.includes(".")) {
      const extension = npmPackage.split(".").pop();

      const extensionList = [
        "d.ts",
        "mjs",
        "ts",
        "tsx",
        "jsx",
        "js",
        "json",
        "css",
      ];
      if (extensionList.includes(extension!)) return;
    }
    try {
      const response = await queuedFetch.fetch(
        `${originToUse}/${npmPackage}/package.json`,
        {
          redirect: "follow",
        },
      );
      if (!response.ok) {
        throw new Error(`Failed to queuedFetch package.json for ${npmPackage}`);
      }
      const packageJson = await response.json() as {
        typings?: string;
        types?: string;
      };
      if (packageJson.typings || packageJson.types) {
        let typingsPath = packageJson.typings || packageJson.types;
        if (typingsPath === "index.d.mts") typingsPath = `index.d.ts`;
        const url = new URL(`https://unpkg.com/${npmPackage}/${typingsPath}`);
        const typingsResponse = await queuedFetch.fetch(url.toString(), {
          redirect: "follow",
        });
        if (!typingsResponse.ok) {
          throw new Error(`Failed to queuedFetch typings for ${npmPackage}`);
        }
        const content = (await typingsResponse.text()).split(
          "https://unpkg.com/",
        ).join();
        if (content.startsWith("Cannot find")) return;

        const typeUrl = typingsResponse.url.replace(
          "https://unpkg.com",
          originToUse,
        );
        if (content) {
          impRes[
            typingsPath === "index.d.ts"
              ? npmPackage
              : `${npmPackage}/${typingsPath}`
          ] = {
            content,
            url: typeUrl,
            ref: `${npmPackage}/${typingsPath}`,
          };
          if (typingsPath !== "index.d.ts") {
            const newBase = new URL(typeUrl).pathname;
            impRes[npmPackage] = {
              url: `${originToUse}/${npmPackage}/index.d.ts`,
              content: `
                import mod from "${newBase}";
                export * from "${newBase}";
                export default mod;
              `,
              ref: npmPackage,
            };
          }

          await ataRecursive(content, new URL(typeUrl + "/../").toString());
        }
      }
    } catch (error) {
      console.error("Error queuedFetching package.json or typings", {
        error,
        npmPackage,
        originToUse,
      });
    }
  }

  async function handleNewBase(newBase: string, ref: string, baseUrl: string) {
    if (!impRes[newBase]) {
      impRes[newBase] = { ref, url: newBase, content: "" };

      impRes[newBase].content = await queuedFetch.fetch(newBase, {
        redirect: "follow",
      })
        .then(async (dtsRes) => {
          impRes[newBase].url = dtsRes.url;
          return await dtsRes.text();
        });

      const fileName = new URL(
        ref.includes("d.ts") || ref.includes(".mjs") || ref.includes(".js")
          || ref.includes(".mts")
          ? ref
          : `${ref}/index.d.ts`,
        ref.startsWith(".") ? baseUrl : originToUse,
      ).toString().replace(".js", ".d.ts").replace(".mjs", ".d.ts").replace(
        ".mts",
        ".d.ts",
      );

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
