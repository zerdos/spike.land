import { getCodeSpace } from "@/hooks/use-code-space";
import { md5 } from "@/lib/md5";
import { tryCatch } from "@/lib/try-catch";
import { wait } from "@/lib/wait";

import { build } from "@/lib/shared";

Object.assign(globalThis, { wait, build });

export const getSpeedy2 = async () => {
  const codeSpace = getCodeSpace(location.pathname);

  const res = await build({
    codeSpace,
    splitting: true,

    origin: location.origin,
    format: "esm",
  }) as unknown as Array<{ text: string; path: string; contents: ArrayBuffer; }>;

  // console.warn({ res }); // Already changed
  // console.warn({ codeSpace }); // Already changed
  // console.warn({ location }); // Already changed

  const css = await fetch(`/live/${codeSpace}/index.css`).then((res) => res.text());
  const appCss = await fetch(`/assets/app.css`).then((res) => res.text());

  const htm = await fetch(`/live/${codeSpace}/htm`).then((res) => res.text());

  const wrapperJs = res.find((x) => x.path.includes("wrapper.mjs"))?.text || "";
  const wrapperCss = res.find((x) => x.path.includes("wrapper.css"))?.text ||
    "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
    <meta name="description" content="spike.land, an online content Editor with AI support">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" >

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap" rel="stylesheet">
    
    <!-- Content Security Policy (unchanged) -->
    <meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    media-src 'self' blob: ;
    script-src 'self' https://js.spike.land https://cdn.jsdelivr.net https://esm.sh https://static.cloudflareinsights.com data: https://clerk.spike.land blob: 'unsafe-eval' 'unsafe-inline';
    worker-src 'self' https://storage.googleapis.com https://esm.sh blob:;
    style-src 'self' https://esm.sh 'unsafe-inline' https://fonts.googleapis.com;
    connect-src 'self' https://cdn.jsdelivr.net blob: https://esm.sh https://clerk.spike.land wss://*.peerjs.com;
    font-src 'self' data: blob: https://esm.sh https://fonts.gstatic.com;
    img-src 'self' https://esm.sh data: blob: https://img.clerk.com https://*.clerk.dev;
">

    <!-- Inline style for initial theme -->
    <style type="text/css">
        :root {
            --bg-color: #ffffff;
            --text-color: #000000;
        }
        @media (prefers-color-scheme: dark) {
            :root {
                --bg-color: #000000;
                --text-color: #ffffff;
            }
        }
        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            transition: background-color 0.3s ease, color 0.3s ease;
        }
    </style>

  <title>CodeSpace archive for ${codeSpace}</title>
  <style type="text/css"> 
    ${appCss}
    ${wrapperCss}
    ${css}
  </style>
</head>
<body>
  <div id="embed">${htm}</div>
  <script type="module">${wrapperJs}</script>

 
</body>
</html>`;
  await fetch(`/live-cms/${codeSpace}.html`, {
    method: "PUT",
    headers: {
      "Content-Type": "text/html",
    },
    body: html,
  });

  console.warn({ res }); // Changed to warn
};
Object.assign(globalThis, { getSpeedy2 });

export const useArchive = async (codeSpace: string) => {
  const attemptBuild = async () =>
    build({
      codeSpace,
      origin: location.origin,
      format: "iife",
    });

  const buildWithRetry = async () => {
    let { data, error } = await tryCatch(attemptBuild());
    if (error) {
      console.error("Build failed, retrying after 1 second:", error);
      await wait(1000);
      ({ data, error } = await tryCatch(attemptBuild())); // Re-assign to data and error
      if (error) {
        console.error("Build failed on retry:", error);
        throw error;
      }
    }
    if (data === null || data === undefined) {
      throw new Error("Build returned null or undefined.");
    }
    return data;
  };

  const indexMjs = await buildWithRetry();

  const css = await fetch(`/live/${codeSpace}/index.css`).then((res) => res.text());
  const htm = await fetch(`/live/${codeSpace}/htm`).then((res) => res.text());

  const html = `<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, interactive-widget=resizes-content">
  <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
  <base href="/">
  <title>CodeSpace archive for ${codeSpace} </title>
  <style type="text/css">
  
    ${css}
  </style>
</head>
<body>
  <div id="embed">${htm}</div>
  <script>
  ${indexMjs}
  </script>
</body>
</html>`;

  const md = md5(html);

  await fetch(`/my-cms/${md}/${codeSpace}.html`, {
    method: "PUT",
    headers: {
      "Content-Type": "text/html",
    },
    body: html,
  });

  location.href = `${location.origin}/my-cms/${md}/${codeSpace}.html`;
};

export const useSpeedy = async (codeSpace: string) => {
  const attemptBuild = async (entryPoint = "") =>
    build({
      codeSpace,
      splitting: true,
      entryPoints: entryPoint ? [entryPoint] : [],
      origin: location.origin,
      format: "esm",
    });

  const buildWithRetry = async (entryPoint = "") => {
    let { data, error } = await tryCatch(attemptBuild(entryPoint));
    if (error) {
      console.error("Build failed, retrying after 1 second:", error);
      await wait(1000);
      ({ data, error } = await tryCatch(attemptBuild(entryPoint))); // Re-assign
      if (error) {
        console.error("Build failed on retry:", error);
        throw error;
      }
    }
    if (data === null || data === undefined) {
      throw new Error("Build returned null or undefined.");
    }
    return data;
  };

  // function base64convert (files) {
  //   console.clear() // This is fine as it's for debugging in browser
  //   const reader = new FileReader()
  //   reader.onload = (e) => {
  //     console.warn(e.target.result) // Changed to console.warn
  //   }
  //   reader.readAsDataURL(files[0])
  // }

  const indexMjs = (await buildWithRetry()) as unknown as Array<{
    contents: Uint8Array;
    path: string;
    text: string;
  }>;

  console.warn({ indexMjs }); // Changed to warn

  //   if (indexCss.length > 0 ) {
  //   const assets = indexCss.filter((f) => f.path.includes("/assets/"));
  //  assets.forEach(async (f) => {
  //     const assetU8Array = f.contents;
  //     const base64TTF = btoa(String.fromCharCode(...assetU8Array));
  //     const path = f.path.split("api/my-cms").pop();
  //     css= css.split(path).join(`data:font/ttf;base64,${base64TTF}`);
  //   });}

  const getMimeType = (extension: string) => {
    const mimeTypes: Record<string, string> = {
      "woff": "font/woff",
      "woff2": "font/woff2",
      "ttf": "font/ttf",
      "otf": "font/otf",
      "eot": "application/vnd.ms-fontobject",
      "svg": "image/svg+xml",
    };
    return mimeTypes[extension] || `font/${extension}`;
  };

  // 2. Proper error handling and logging
  indexMjs.filter((f) => !f.path.endsWith(".css") && !f.path.endsWith(".mjs"))
    .forEach(async (f) => {
      const uploadFont = async () => {
        const body = f.contents;
        const extension = f.path.split(".").pop() as string;
        const mimeType = getMimeType(extension);

        const response = await fetch(f.path.slice(1), {
          method: "PUT",
          body,
          headers: { "Content-Type": mimeType },
        });

        if (!response || !response.ok) {
          throw new Error(`Failed to upload font: ${f.path}, Status: ${response.status}`);
        }
      };
      const { error } = await tryCatch(uploadFont());
      if (error) {
        console.error(`Error processing font: ${f.path}`, error);
      }
    });

  // 4. Update CSS to use correct paths
  const updateCssPaths = (css: string, codeSpace: string) => {
    return css.replace(
      /url\((["']?)\/assets\//g,
      `url($1https:/testing.spike.land/live/${codeSpace}/api/my-cms/assets/`,
    );
  };
  let updatedCss = "";
  // Usage in your main function:
  const css = indexMjs.find((f) => f.path.endsWith("/api/my-cms/index.css"))
    ?.text;
  if (css) {
    updatedCss = updateCssPaths(css, codeSpace);
    // Use updatedCss in your HTML template
  }

  // await fetch(f.path.slice(1), {method: "PUT", body, headers: {"Content-Type": `font/${extension}`}});

  const htm = await fetch(`/live/${codeSpace}/htm`).then((res) => res.text());

  const html = `<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, interactive-widget=resizes-content">
  <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
  <base href="/">
  <style type="text/css">  
    ${updatedCss}
  </style>
</head>
<body>
  <div id="embed">${htm}</div>
  <script type="module">
  ${indexMjs[0].text.split("@import url(").join("//@import url(")}
  </script>
</body>
</html>`;

  const md = md5(html);

  await fetch(`/my-cms/${md}/${codeSpace}.html`, {
    method: "PUT",
    headers: {
      "Content-Type": "text/html",
    },
    body: html,
  });

  console.warn(`${location.origin}/my-cms/${md}/${codeSpace}.html`); // Changed to warn
};
