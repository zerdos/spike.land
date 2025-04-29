import { QueuedFetch } from "@/lib/queued-fetch";
import { setupTypeAcquisition } from "@typescript/ata";
import { Mutex } from "async-mutex";
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

const mutex = new Mutex();

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
    const cleanFilePath = new URL(filePath, origin).href.split("@types/").join("").split(
      "ts5.0/",
    ).join("")
      .split("v18/").join("")
      .split("v19/").join("")
      .split("v20/").join("")
      .split("v21/").join("")
      .split("v22/").join("");
    
    if (monacoExtraLibs.some((x) => x.filePath === cleanFilePath)) continue;
    monacoExtraLibs.push({ filePath: cleanFilePath, content });
  }
  console.log("monacoExtraLibs", monacoExtraLibs);
  return monacoExtraLibs;
};

export async function ata({
  code,
  originToUse,
}: {
  code: string;
  originToUse: string;
}): Promise<ExtraLib[]> {
  console.log("[ATA] Entered ata function", { codeLength: code?.length, originToUse });
  const queuedFetch = new QueuedFetch(4, 2000);
  const impRes: Record<string, ImportResult> = {};
  let thisATA: ExtraLib[] = [];

  const initialImports = (await tsx(code));//filter((x) => x.includes("@/"));

  console.log("initialImports", initialImports);
  initialImports.push("react", "@emotion/react/jsx-runtime");

  // Remove duplicates
  const uniqueImports = [...new Set(initialImports)];
  // Remove imports that are not needed
  const filteredImports = uniqueImports.filter((x) => {
    return !(
      x.includes("node_modules") ||
      x.includes("https://") ||
      x.includes(".d.ts") ||
      x.includes(".mjs") ||
      x.includes(".js") ||
      x.includes(".mts")
    );
  });
  // Remove imports that are not needed


  try {
    // Fetch initial imports
    await Promise.all(  
      filteredImports.map(async (r) => {
        if (impRes[r]) {
          console.log("Already processed", r);
          return;
        }
        try{
           await tryToExtractUrlFromPackageJson(r);
        }catch (error) {
          console.error("error", error);
        }

        if (impRes[r]) {
          await ataRecursive(impRes[r]['content'], impRes[r]['url']);
          console.log("Already processed", r);
          return;}
        try {
          const link = r.startsWith("/") ? r : `/${r}`;
          const resp = await queuedFetch.fetch(`${link}.d.ts`);
          if (!resp.ok) {
            console.log("Not found", r);
            return;
          }
          const content = await resp.text();
          if (!content || content.startsWith("Cannot find") || content.includes('- error *')) return;
          impRes[r] = { url: resp.url, ref: "", content };
          let baseUrl = new URL(resp.url);
          // set the origin to the baseUrl
          baseUrl = new URL(baseUrl.href,originToUse);
          impRes[r].url = baseUrl.href;
          impRes[r].ref = r;
          await ataRecursive(impRes[r]['content'], impRes[r]['url']);
          // Recursively fetch cleanPathsAndReference
        } catch (error) {
          console.error("error", error);
        }
      }),
    );

    cleanPathsAndReferences(impRes, originToUse);

    // Add extra Emotion libs for css prop and JSX runtime
    // const extras = getEmotionExtras(originToUse);

    const extraLibs = [
      ...(await generateExtraLibs(impRes, originToUse)),
      // ...extras,
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

  // const ataBIG = await myATA(code);
  console.log("[ATA] Returning from ata function", { resultCount: thisATA.length });
  return thisATA.map((x) => ({
    filePath: x.filePath.startsWith("/") ? x.filePath : `/${x.filePath}`,
    content: x.content,
    }));
  // [...ataBIG, ...thisATA];

  async function ataRecursive(fileContent: string, baseUrl: string) {
    console.log("[ATA] Entered ataRecursive", { fileContentLength: fileContent?.length, baseUrl });
    // Extract references from code comments and run tsx on it
    let references = await tsx(fileContent);
    references = [
      ...new Set([...references, ...extractReferencePaths(fileContent)]),
    ];

    console.log("[ATA] ataRecursive: raw references", { references });
    console.log("[ATA] ataRecursive: resolving references", { referencesCount: references.length });
    await Promise.all(
      references.map(async (r: string) => {
        // Clean up reference string
        const cleanedRef = r.replace(/^['"`{]+|['"`}]+$/g, "");
        if (impRes[cleanedRef]) return;
        await tryToExtractUrlFromPackageJson(cleanedRef);
        if (impRes[cleanedRef]) return;

        let newBase: string | null | undefined = null;

        if (r.startsWith(".")) {
          newBase = new URL(`${baseUrl}/${r}`).toString();
        } else if (r.startsWith("https://")) {
          newBase = r;
        } else {
          newBase = await resolveNonRelativeRef(r, originToUse, queuedFetch);
        }

        if (!newBase) {
          console.log("No new base found for", r);
          await tryToExtractUrlFromPackageJson(r);
          console.log("tryToExtractUrlFromPackageJson", r);
          console.log("impRes", impRes[r]);
        } else {
          await handleNewBase(newBase, r, baseUrl);
        }
      }),
    );
    console.log("[ATA] ataRecursive: resolved all references", { referencesCount: references.length });
  }


  
  async function tryToExtractUrlFromPackageJson(npmPackage: string) {
    console.log("[ATA] Entered tryToExtractUrlFromPackageJson", { npmPackage });



    if (impRes[npmPackage]) return;

    if (npmPackage.includes("https://")) return;
    if (hasFileExtension(npmPackage)) return;
    if (npmPackage.startsWith("@/")) {
      const dtsRes = await queuedFetch.fetch(
        `${originToUse}/${npmPackage}.d.ts`,
        { redirect: "follow" },
      );
      if (!dtsRes.ok) return;
      const content = await dtsRes.text();
      impRes[npmPackage] = { url: dtsRes.url, ref: npmPackage, content };
      await ataRecursive(content, dtsRes.url);
      return;
    }

    const codeToAst = `import mod from "${npmPackage}";
    export * from "${npmPackage}";`

    
try{

  try{
    const files = await mutex.runExclusive(()=>myATA(codeToAst));
    
    files.forEach((file) => {
      let filePath = file.filePath.replace(originToUse, "").replace('/node_modules/', '').replace('@types/', '');
      if (filePath.startsWith("/")) {
        filePath = filePath.slice(1);
      }

      if (impRes[filePath]) return;
      const content = file.content
        .split(`import mod from "/`).join(`import mod from "`)
        .split(`export * from "/`).join(`export * from "`);
      impRes[filePath] = { url: filePath, ref: npmPackage, content };
    });
  } catch (error) {
    console.error("Error in mutex runExclusive", {
      error,
      npmPackage,


      originToUse,
    });
  }


    
    
    

    if (impRes[npmPackage]) return;
    if (npmPackage.includes("https://")) return;
    if (hasFileExtension(npmPackage)) return;
    if (originToUse.endsWith(".d.ts")) return;

    
    // Skip if already processed or if not applicable
    if (impRes[npmPackage]) return;
    if (npmPackage.includes("https://")) return;
    if (hasFileExtension(npmPackage)) return;
    if (originToUse.endsWith(".d.ts")) return;
  } catch (error) {
    console.error("Error in tryToExtractUrlFromPackageJson", {
      error,
      npmPackage,
      originToUse,
    });
  }
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
      const typingsUrl = `${originToUse}/${npmPackage}/${resolvedTypingsPath}`.replace(/([^:]\/)/g, "$1");
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
          url: `${originToUse}/${npmPackage}/index.d.ts`.replace(/([^:]\/)/g, "$1"),
          content: `
import mod from "${npmPackage}";
export * from "${npmPackage}";
export default mod;`,
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
    console.log("[ATA] Entered handleNewBase", { newBase, ref, baseUrl });
    if (impRes[newBase]) return;

    impRes[newBase] = { ref, url: newBase, content: "" };
    console.log("[ATA] handleNewBase: fetching newBase", { newBase });
    impRes[newBase].content = await queuedFetch
      .fetch(newBase, { redirect: "follow" })
      .then(async (dtsRes) => {
        impRes[newBase].url = dtsRes.url;
        return dtsRes.text();
      });
    console.log("[ATA] handleNewBase: fetched newBase", { newBase, contentLength: impRes[newBase].content?.length });

    const fileName = getFileNameForRef(ref, baseUrl, originToUse);
    if (!impRes[fileName]) {
      impRes[fileName] = {
        url: fileName,
        content: `
import mod from "${ref}";
export * from "${ref}";
export default mod;`,
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
      `${originToUse}/*${ref}`.replace(/([^:]\/)/g, "$1"),
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
      `${originToUse}/${ref}`.replace(/([^:]\/)/g, "$1"),
      { redirect: "follow" },
    );

    if (!directResponse.ok) {
      // Third attempt: Try with .d.ts extension
      const dtsResponse = await queuedFetch.fetch(
        `${originToUse}/${ref}.d.ts`.replace(/([^:]\/)/g, "$1"),
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
  const vNumbers = /(\/(v)[0-9]+\/)/gm;
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
            .split('https://spike.land')
            .join("")
            .split("https://esm.sh")
            .join("")
            .split(`https://${originToUse}/${x}`)
            .join(impRes[x].ref)
            .split(`${originToUse}/${x}`)
            .join(impRes[x].ref)
            .split(originToUse)
            .join("")
            .replace(vNumbers, subst)
            .split("/@types/")
            .join("/")
            .split(`/${x}`)
            .join(impRes[x].ref)
            .replaceAll(versionNumbers, "")
            .replace(/\.d\.ts\//, '/'), // Clean up any .d.ts in middle of paths
          url: data.url
            .split('https://spike.land')
            .join("")
            .split("https://esm.sh")
            .join("")
            .replace(vNumbers, subst)
            .split("/@types/")
            .join("/")
            .replaceAll(versionNumbers, "")
            .replace(/\.d\.ts\//, '/'), // Clean up any .d.ts in middle of paths
        };
      });
    });

  // Replace origin
  Object.keys(impRes).forEach((x) => {
    const data = impRes[x];
    impRes[x] = {
      url: data.url.split(originToUse).join(""),
      ref: data.ref,
      content: data.content.split(originToUse).join("")
    };
  });
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
  // Remove .d.ts if it's in the middle of the path
  const cleanRef = ref.replace(/\.d\.ts\//, '/');
  
  const normalizedRef = cleanRef.includes("d.ts") || cleanRef.includes(".mjs") ||
    cleanRef.includes(".js") || cleanRef.includes(".mts")
    ? cleanRef
    : `${cleanRef}/index.d.ts`;
  
  const base = cleanRef.startsWith(".") ? baseUrl : originToUse;
  const url = new URL(normalizedRef, base);
  
  return url.toString()
    .replace(/\.js(\/|$)/, '.d.ts$1')
    .replace(/\.mjs(\/|$)/, '.d.ts$1')
    .replace(/\.mts(\/|$)/, '.d.ts$1')
    .replace(/([^:]\/)/g, "$1") // Normalize any double slashes
    .replace(/\.d\.ts\//, '/'); // Clean up any remaining .d.ts in the middle of paths
}

Object.assign(self, { ata });
