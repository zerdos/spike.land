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

  async function processCode(code: string, baseUrl: string) {



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
      await handleNewBase(newBase, importPath, baseUrl, originToUse);
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

      const response = await fetch(`${originToUse}/*${npmPackage}`,{redirect: 'follow'});
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

    const newBaseReq = await fetch(newBase, {redirect: 'follow'});
    if (!newBaseReq.ok) return null;

    const rawContent = await newBaseReq.text();
    return rawContent === "Module not found" ? null : newBase;
  }

  async function extractUrlFromResponse(response: Response, ref: string): Promise<string | null> {
    const responseText = importMapReplace(await prettierJs(await response.text()), ref);
    return responseText.split("\"").find(x => x.startsWith("https://") && x.includes(ref)) || null;
  }

  async function tryToExtractUrlFromPackageJson(npmPackage: string) {
    // if (npmPackage === 'react') return;

    if (importResults[npmPackage]) return;
    if (!npmPackage.includes('.')) {
    try {
      const dtsUrl = `${originToUse}/${npmPackage}/index.d.ts`;;
      const pjFeq = await fetch(dtsUrl);

      if (pjFeq.ok) {
        const content = await pjFeq.text()
        if (content.includes('esm.sh - error')) return;

        importResults[npmPackage] = { url:dtsUrl, content, ref: `${originToUse}/${npmPackage}` };
        await processCode(content, `${originToUse}/${npmPackage}`);

          
        
      }
    } catch (error) {
      console.error("error fetching package.json", { error, npmPackage, originToUse, importResults });
    }
    }
  }

  async function handleNewBase(newBase: string, ref: string, baseUrl: string, originToUse: string) {
    if (!importResults[newBase]) {
      importResults[newBase] = { ref, url: newBase, content: "" };

      importResults[newBase].content = await fetch(newBase, {redirect: 'follow'})
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

      if (importResults[newBase].content !== "Module not found" && !importResults[newBase].content.includes("esm.sh - error")) {
        await processCode(importResults[newBase].content, newBase);
      } else {
        delete importResults[newBase];
        return;
      }

      if (!importResults[fileName]) {
        const npmBase = newBase.replace(originToUse, '');
        importResults[fileName] = {
          url: fileName,
          content: `
            import type mod from "${npmBase}";
            export type * from "${npmBase}";
            export default mod";
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

  const versionNumbers = /@(\^)?\d+(\.)?\d+(\.)?\d+/gm;
  const vNumbers = /\/(v)[0-9]+\//gm;
  const subst = "/";

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


  Object.keys(importResults)
  .filter((x) => !(importResults[x].ref.startsWith(".") || importResults[x].ref.startsWith("https")))
  .forEach((x) => {
    Object.keys(importResults).forEach((t) => {
      importResults[t] = {
        ref: importResults[t].ref,
        content: importResults[t].content
          .split(importResults[x].url!)
          .join(x)
          .split(`https://${originToUse}/${x}`)
          .join(importResults[x].ref)
          .replace(vNumbers, subst)
          .split("@types/")
          .join("")
          .split("/index.d.ts")
          .join("")
          
          .replaceAll(versionNumbers, ""),
        url: importResults[t].url!
          .replace(vNumbers, subst)
          .split("@types/")
          .join("")
          .replaceAll(versionNumbers, "")
          .split("/index.d.ts")
          .join(""),
      };
    });
  });

  // Deduplicate and sort extra libs
  return [...new Set(extraLibs.map((x) => x.filePath))]
    .map((y) => extraLibs.find((p) => p.filePath === y))
    .sort((a, b) => (a?.filePath ?? "").localeCompare(b?.filePath ?? ""));
}

Object.assign(self, { ata });
