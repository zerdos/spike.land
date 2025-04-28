import { QueuedFetch } from "@/lib/queued-fetch";
import { setupTypeAcquisition } from "@typescript/ata";
import ts from "typescript";
const self = globalThis;

interface ImportResult {
  url: string;
  content: string;
  ref: string;
}

interface ExtraLib {
  filePath: string;
  content: string;
}

const tsx = (globalThis as unknown as { tsx: (code: string) => Promise<string[]>; })
  .tsx as (
    code: string,
  ) => Promise<string[]>;

export const myATA = async (code: string) => {
  const limitedFetch = new QueuedFetch(4, 1000, 0);

  const vfsPromise = new Promise<Map<string, string>>((resolve) =>
    setupTypeAcquisition({
      projectName: "My ATA Project",
      logger: console,
      fetcher: limitedFetch.fetch.bind(limitedFetch) as typeof fetch,
      typescript: ts,
      delegate: {
        receivedFile: (_fileContent: string, filePath: string) => {
          console.log("ATA received file", { filePath });
        },
        started: () => console.log("ATA start"),
        progress: (downloaded: number, total: number) =>
          console.log(`Got ${downloaded} out of ${total}`),
        finished: (vfs) => {
          console.log("ATA done");
          resolve(vfs);
        },
      },
    })(code)
  );

  const fileMap = await vfsPromise;
  const monacoExtraLibs: ExtraLib[] = [];
  for (const [filePath, content] of fileMap.entries()) {
    // Strip off the leading 13 characters and remove "@types/"
    const cleanFilePath = filePath.slice(13).split("@types/").join("").split(
      "ts5.0/",
    ).join("")
      .split("v18/").join("");
    if (monacoExtraLibs.some((x) => x.filePath === cleanFilePath)) continue;
    monacoExtraLibs.push({ filePath: cleanFilePath, content });
  }
  return monacoExtraLibs;
};

export async function ata({
  code,
  originToUse,
}: {
  code: string;
  originToUse: string;
}): Promise<ExtraLib[]> {
  const queuedFetch = new QueuedFetch(4, 2000);
  const impRes: Record<string, ImportResult> = {};
  let thisATA: ExtraLib[] = [];

  const initialImports = (await tsx(code)).filter((x) => x.includes("@/"));

  try {
    // Fetch initial imports
    await Promise.all(
      initialImports.map(async (r) => {
        if (originToUse.endsWith(".d.ts")) return;
        try {
          const resp = await queuedFetch.fetch(`${originToUse}/${r}.d.ts`);
          const content = await resp.text();
          impRes[r] = { url: resp.url, ref: "", content };
          await ataRecursive(content, new URL(resp.url).origin);
        } catch (error) {
          console.error("error", error);
        }
      }),
    );

    cleanPathsAndReferences(impRes, originToUse);

    // Add extra Emotion libs for css prop and JSX runtime
    const extras = getEmotionExtras(originToUse);

    const extraLibs = [
      ...(await generateExtraLibs(impRes, originToUse)),
      ...extras,
    ];

    // Remove duplicates, sort, and clean file paths
    thisATA = [
      ...new Set(extraLibs.map((x) => x.filePath)),
    ]
      .map((y) => extraLibs.find((p) => p.filePath === y))
      .sort((a, b) => (a?.filePath ?? "").localeCompare(b?.filePath ?? ""))
      .map((c) => ({
        filePath: c!.filePath.replace(originToUse, ""),
        content: c!.content,
      }));
  } catch (error) {
    console.error("error", error);
  }

  const ataBIG = await myATA(code);
  return [...ataBIG, ...thisATA];

  async function ataRecursive(fileContent: string, baseUrl: string) {
    // Extract references from code comments and run tsx on it
    let references = await tsx(fileContent);
    references = [
      ...new Set([...references, ...extractReferencePaths(fileContent)]),
    ];

    await Promise.all(
      references.map(async (r: string) => {
        if (impRes[r]) return;
        await tryToExtractUrlFromPackageJson(r);
        if (impRes[r]) return;

        let newBase: string | null | undefined = null;

        if (r.startsWith(".")) {
          newBase = new URL(`${baseUrl}/${r}`).toString();
        } else if (r.startsWith("https://")) {
          newBase = r;
        } else {
          newBase = await resolveNonRelativeRef(r, originToUse, queuedFetch);
        }

        if (!newBase) {
          await tryToExtractUrlFromPackageJson(r);
        } else {
          await handleNewBase(newBase, r, baseUrl);
        }
      }),
    );
  }

  async function tryToExtractUrlFromPackageJson(npmPackage: string) {
    // Skip if already processed or if not applicable
    if (impRes[npmPackage]) return;
    if (npmPackage.includes("https://")) return;
    if (hasFileExtension(npmPackage)) return;
    if (originToUse.endsWith(".d.ts")) return;

    try {
      const pkgResp = await queuedFetch.fetch(
        `${originToUse}/${npmPackage}/package.json`,
        {
          redirect: "follow",
        },
      );
      if (!pkgResp.ok) return;

      const packageJson: { typings?: string; types?: string; } = await pkgResp
        .json();
      const typingsPath = packageJson.typings || packageJson.types;

      if (!typingsPath) return;

      const resolvedTypingsPath = typingsPath === "index.d.mts"
        ? "index.d.ts"
        : typingsPath;
      const typingsUrl = `${originToUse}/${npmPackage}/${resolvedTypingsPath}`.replace(/([^:]\/)\/+/g, "$1");
      const typingsResp = await queuedFetch.fetch(typingsUrl, {
        redirect: "follow",
      });
      if (!typingsResp.ok) return;

      const content = (await typingsResp.text()).split(originToUse)
        .join("");
      if (!content || content.startsWith("Cannot find")) return;

      const typeUrl = typingsResp.url;
      impRes[
        resolvedTypingsPath === "index.d.ts"
          ? npmPackage
          : `${npmPackage}/${resolvedTypingsPath}`
      ] = {
        content,
        url: typeUrl,
        ref: `${npmPackage}/${resolvedTypingsPath}`,
      };

      if (resolvedTypingsPath !== "index.d.ts") {
        const newBasePath = new URL(typeUrl).pathname;
        impRes[npmPackage] = {
          url: `${originToUse}/${npmPackage}/index.d.ts`.replace(/([^:]\/)\/+/g, "$1"),
          content: `
            import mod from "${newBasePath}";
            export * from "${newBasePath}";
            export default mod;
          `,
          ref: npmPackage,
        };
      }

      await ataRecursive(content, new URL(typeUrl + "/../").toString());
    } catch (error) {
      console.error("Error extracting package.json or typings", {
        error,
        npmPackage,
        originToUse,
      });
    }
  }

  async function handleNewBase(newBase: string, ref: string, baseUrl: string) {
    if (impRes[newBase]) return;

    impRes[newBase] = { ref, url: newBase, content: "" };
    impRes[newBase].content = await queuedFetch
      .fetch(newBase, { redirect: "follow" })
      .then(async (dtsRes) => {
        impRes[newBase].url = dtsRes.url;
        return dtsRes.text();
      });

    const fileName = getFileNameForRef(ref, baseUrl, originToUse);
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

    if (impRes[newBase].content.length > 0 && impRes[newBase].content !== "Types not found") {
      try {
        await ataRecursive(impRes[newBase].content, impRes[newBase].url);
      } catch (error) {
        console.error("ata error", error);
      }
    }
  }
}

/** Utility functions **/

function hasFileExtension(fileName: string): boolean {
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
  const extension = fileName.split(".").pop();
  return extensionList.includes(extension ?? "");
}

function extractReferencePaths(content: string): string[] {
  const refParts = content.split(`/// <reference path="`);
  if (refParts.length <= 1) return [];

  const [, ...refs] = refParts;
  return refs.map((r) => r.split(`"`)[0]);
}

async function resolveNonRelativeRef(
  ref: string,
  originToUse: string,
  queuedFetch: QueuedFetch,
): Promise<string | null> {
  if (originToUse.endsWith(".d.ts")) return null;

  try {
    // First attempt: Try with wildcard
    const wildcardResponse = await queuedFetch.fetch(
      `${originToUse}/*${ref}`.replace(/([^:]\/)\/+/g, "$1"),
      { redirect: "follow" },
    );

    if (wildcardResponse.ok) {
      const tsTypes = wildcardResponse.headers.get("X-typescript-types");
      if (tsTypes) return new URL(tsTypes).toString();

      const extractedUrl = await extractUrlFromResponse(wildcardResponse, ref);
      return extractedUrl ? new URL(extractedUrl).toString() : null;
    }

    // Second attempt: Try direct path
    const directResponse = await queuedFetch.fetch(
      `${originToUse}/${ref}`.replace(/([^:]\/)\/+/g, "$1"),
      { redirect: "follow" },
    );

    if (!directResponse.ok) {
      // Third attempt: Try with .d.ts extension
      const dtsResponse = await queuedFetch.fetch(
        `${originToUse}/${ref}.d.ts`.replace(/([^:]\/)\/+/g, "$1"),
        { redirect: "follow" },
      );

      if (!dtsResponse.ok) return null;

      const tsTypes = dtsResponse.headers.get("X-typescript-types");
      const newBase = tsTypes || dtsResponse.url;

      // Verify the URL is actually accessible
      const isAccessible = await queuedFetch.fetch(newBase)
        .then((res) => res.ok)
        .catch(() => false);

      return isAccessible ? newBase : null;
    } // ${

    return directResponse.url; // ${
  } catch (error) {
    console.error("Failed to resolve reference", { ref, originToUse, error });
    return null;
  }
}

async function extractUrlFromResponse(
  response: Response,
  ref: string,
): Promise<string | null> {
  const responseText = await response.text();
  return (
    responseText.split(`"`).find((x) => x.startsWith("https://") && x.includes(ref)) || null
  );
}

function cleanPathsAndReferences(
  impRes: Record<string, { url: string; content: string; ref: string; }>,
  originToUse: string,
) {
  const versionNumbers = /@(\^)?\d+(\.)?\d+(\.)?\d+/gm;
  const vNumbers = /\/(v)[0-9]+\//gm;
  const subst = "/";

  // Replace references and clean versions
  Object.keys(impRes)
    .filter((x) => !(impRes[x].ref.startsWith(".") || impRes[x].ref.startsWith("https")))
    .forEach((x) => {
      Object.keys(impRes).forEach((t) => {
        const data = impRes[t];
        impRes[t] = {
          ref: data.ref,
          content: data.content
            .split(impRes[x].url)
            .join(x)
            .split(`https://${originToUse}/${x}`)
            .join(impRes[x].ref)
            .replace(vNumbers, subst)
            .split("/@types/")
            .join("/")
            .replaceAll(versionNumbers, ""),
          url: data.url
            .replace(vNumbers, subst)
            .split("/@types/")
            .join("/")
            .replaceAll(versionNumbers, ""),
        };
      });
    });

  // Replace origin
  Object.keys(impRes).forEach((x) => {
    const data = impRes[x];
    impRes[x] = {
      url: data.url.split(originToUse).join(""),
      ref: data.ref,
      content: data.content.split(originToUse).join(""),
    };
  });
}

function getEmotionExtras(originToUse: string): ExtraLib[] {
  return [
    {
      filePath: `${originToUse}/@emotion/react/css-prop.d.ts`,
      content: `
  import type { Interpolation } from '@emotion/react';    
  declare module 'react' {
  interface Attributes {
    css?: Interpolation<unknown>;
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
}

async function generateExtraLibs(
  impRes: Record<string, ImportResult>,
  originToUse: string,
): Promise<ExtraLib[]> {
  const entries = Object.keys(impRes)
    .filter((x) => impRes[x].content.length && impRes[x].url);

  return Promise.all(
    entries.map(async (x) => {
      const filePath = impRes[x].url
        .replace(originToUse, "");
      const content = impRes[x].content
        .split(`import mod from "/`).join(`import mod from "`)
        .split(`export * from "/`).join(`export * from "`);
      return { filePath, content };
    }),
  );
}

function getFileNameForRef(
  ref: string,
  baseUrl: string,
  originToUse: string,
): string {
  const normalizedRef = ref.includes("d.ts") || ref.includes(".mjs") || ref.includes(".js") ||
    ref.includes(".mts")
    ? ref
    : `${ref}/index.d.ts`;
  
  const base = ref.startsWith(".") ? baseUrl : originToUse;
  const url = new URL(normalizedRef, base);
  
  return url.toString()
    .replace(".js", ".d.ts")
    .replace(".mjs", ".d.ts")
    .replace(".mts", ".d.ts")
    .replace(/([^:]\/)\/+/g, "$1"); // Normalize any double slashes
}

Object.assign(self, { ata });
