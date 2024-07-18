import { importMapReplace } from "./importMapReplace";

interface ATAOptions {
  code: string;
  originToUse: string;
  prettierJs: (code: string) => Promise<string>;
  tsx: (code: string) => Promise<string[]>;
}

interface ImportResult {
  url: string;
  content: string;
  ref: string;
}

export async function ata({ code, originToUse, prettierJs, tsx }: ATAOptions) {
  const importResults: Record<string, ImportResult> = {};

  async function processCode(code: string, baseUrlA: string) {
    const baseUrlParts = new URL(baseUrlA).href.split("/");
    baseUrlParts.pop();
    const baseUrl = baseUrlParts.join("/");

    const prettifiedCode = await prettierJs(code);
    const imports = await tsx(prettifiedCode);
    const references = extractReferences(code);
    const uniqueImports = [...new Set([...imports, ...references])];

    await Promise.all(uniqueImports.map(imp => processImport(imp, baseUrl)));
  }

  function extractReferences(code: string): string[] {
    const refParts = code.split("/// <reference path=\"");
    if (refParts.length <= 1) return [];

    return refParts.slice(1).map(part => {
      const ref = part.split("\"")[0];
      return ref.startsWith(".") || ref.startsWith("https://")
        ? ref
        : new URL(ref.slice(1), originToUse).toString();
    });
  }

  async function processImport(importPath: string, baseUrl: string) {
    if (importResults[importPath]) return;

    const newBase = await resolveImportPath(importPath, baseUrl);
    if (newBase) {
      await handleNewBase(newBase, importPath, baseUrl);
    }
  }

  async function resolveImportPath(importPath: string, baseUrl: string): Promise<string | null> {
    if (importPath.startsWith(".")) {
      return new URL(importPath, baseUrl).toString();
    } else if (importPath.startsWith("https://")) {
      return importPath;
    } else {
      return await resolveNpmPackage(importPath);
    }
  }

  async function resolveNpmPackage(npmPackage: string): Promise<string | null> {
    try {
      await tryToExtractUrlFromPackageJson(npmPackage);
      if (importResults[npmPackage]) return null;

      const response = await fetch(`${originToUse}/*${npmPackage}`);
      if (!response.ok) throw new Error("Failed to fetch");

      return response.headers.get("X-typescript-types") || await extractUrlFromResponse(response, npmPackage);
    } catch (error) {
      return await handleFallbackFetch(npmPackage);
    }
  }

  async function handleFallbackFetch(npmPackage: string): Promise<string | null> {
    const response = await fetch(`${originToUse}/${npmPackage}`);
    const typescriptTypes = response.headers.get("X-typescript-types");
    const newBase = typescriptTypes || `${originToUse}/${npmPackage}`;

    const newBaseReq = await fetch(newBase);
    if (!newBaseReq.ok) return null;

    const rawContent = await newBaseReq.text();
    return rawContent === "Module not found" ? null : newBase;
  }

  async function extractUrlFromResponse(response: Response, ref: string): Promise<string | null> {
    const responseText = importMapReplace(await prettierJs(await response.text()), ref);
    return responseText.split("\"").find(x => x.startsWith("https://") && x.includes(ref)) || null;
  }

  async function tryToExtractUrlFromPackageJson(npmPackage: string) {
    if (importResults[npmPackage]) return;
    if (!npmPackage.includes('.')) {
    try {
      const pjFeq = await fetch(`${originToUse}/${npmPackage}/package.json`);
      if (pjFeq.ok) {
        const packageJson = await pjFeq.json<{ typings?: string; types?: string; module?: string }>();
        const types = packageJson.typings || packageJson.types;
        if (types) {
          const url = new URL(npmPackage + "/" + types, originToUse);
          const uRLSTR = url.toString();
          const rawContent = await fetch(uRLSTR).then((res) => res.text());
          const content = importMapReplace(await prettierJs(rawContent), uRLSTR);
          if (content && rawContent !== "Module not found" && content !== "Module not found") {
            importResults[uRLSTR] = { url: uRLSTR, content, ref: uRLSTR };
            await processCode(content, uRLSTR);

            const defaultIndexDtsUrl = new URL(npmPackage + "/index.d.ts", originToUse);
            if (defaultIndexDtsUrl.toString() !== url.toString()) {
              const fileName = defaultIndexDtsUrl.toString();
              const newBase = npmPackage + "/" + types;
              const ref = npmPackage;

              importResults[npmPackage] = {
                url: fileName,
                content: `
                  import mod from "${newBase}";
                  export * from "${newBase}";
                  export default mod;
                `,
                ref,
              };

              await processCode(importResults[npmPackage].content, url.toString());
            }

            await processCode(importResults[npmPackage].content, importResults[npmPackage].url);
          }
        }
      }
      if (!npmPackage.endsWith(".d.ts")) {
        const DTSurl = `${originToUse}/${npmPackage}.d.ts`;
        const dtsReq = await fetch(DTSurl);
        if (dtsReq.ok) {
          const rawContent = await dtsReq.text();
          if (rawContent !== "Module not found") {
            const content = importMapReplace(await prettierJs(rawContent), DTSurl);
            if (content && content !== "Module not found") {
              importResults[`${npmPackage}.d.ts`] = { url: dtsReq.url, content, ref: npmPackage };
              await processCode(content, DTSurl);
            }
          }
        }
      }
    } catch (error) {
      console.error("error fetching package.json", { error, npmPackage, originToUse, importResults });
    }
    }
  }

  async function handleNewBase(newBase: string, ref: string, baseUrl: string) {
    if (!importResults[newBase]) {
      importResults[newBase] = { ref, url: newBase, content: "" };

      importResults[newBase].content = await fetch(newBase)
        .then((dtsRes) => {
          importResults[newBase].url = dtsRes.url;
          return dtsRes.text();
        });

      const fileName = new URL(
        ref.includes("d.ts") || ref.includes(".mjs")
          ? ref
          : `${ref}/index.d.ts`,
        ref.startsWith(".") ? baseUrl : originToUse,
      ).toString();

      if (importResults[newBase].content !== "Module not found") {
        await processCode(importResults[newBase].content, newBase);
      } else {
        delete importResults[newBase];
        return;
      }

      if (!importResults[fileName]) {
        importResults[fileName] = {
          url: fileName,
          content: `
            import mod from "${newBase}";
            export * from "${newBase}";
            export default mod;
          `,
          ref,
        };

        console.log(`virtual file: ${fileName}`, importResults[fileName]);
      }

      if (importResults[newBase].content.length > 0) {
        try {
          await processCode(importResults[newBase].content, importResults[newBase].url);
        } catch (error) {
          console.error("ata error", error);
        }
      }
    }
  }

  // Main execution
  await processCode(
    `/** @jsx jsx */
    import { jsx } from "@emotion/react";
    ${code}`,
    originToUse,
  );

 
  // Process and return extra libraries
  return processExtraLibraries(originToUse, importResults, prettierJs);
}

async function processExtraLibraries(
  originToUse: string,
  importResults: Record<string, ImportResult>,
  prettierJs: (code: string) => Promise<string>,
) {
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
      Object.keys(importResults)
        .filter((x) => importResults[x].content.length && importResults[x].url)
        .map(async (x) => ({
          filePath: importResults[x].url!,
          content: (await prettierJs(importResults[x].content))
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
}

Object.assign(self, { ata });
