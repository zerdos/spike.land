import { useCodeSpace } from "@src/hooks/useCodeSpace";
import { md5 } from "@src/md5";
import { build } from "../shared";
import { wait } from "../wait";

import { useAuth } from "@clerk/clerk-react";

const auth = () => {
  const { getToken } = useAuth();
  const authenticatedFetch = async (url: string, options: RequestInit) => {
    return fetch(url, {
      ...options,
      headers: { Authorization: `Bearer ${await getToken()}` },
    }).then((res) => res.json());
  };
  Object.assign(globalThis, { authenticatedFetch });
};

Object.assign(globalThis, { auth, wait, build });

export const useSpeedy2 = async () => {
  const codeSpace = useCodeSpace();
  const res = await build({
    codeSpace,
    splitting: true,
    origin: location.origin,
    format: "esm",
  });

  console.log({ res });
};
Object.assign(globalThis, { useSpeedy2 });

export const useArchive = async (codeSpace: string) => {
  const buildWithRetry = async () => {
    try {
      return await build({
        codeSpace,
        origin: location.origin,
        format: "iife",
      });
    } catch (e) {
      console.error("Build failed, retrying after 1 second:", e);
      await wait(1000);
      return await build({
        codeSpace,
        origin: location.origin,
        format: "iife",
      });
    }
  };

  const indexMjs = await buildWithRetry();

  const gJunk = await fetch(`/assets/g-chunk-72a597.css`).then((res) => res.text());
  const css = await fetch(`/live/${codeSpace}/index.css`).then((res) => res.text());
  const twJS = await fetch(`/assets/tw-chunk-be5bad.js`).then((res) => res.text());
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
  <style>
    ${gJunk}
    ${css}
  </style>
</head>
<body>
  <div id="embed">${htm}</div>
  <script>
  ${indexMjs}
  ${twJS}
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

  location.href = `${window.location.origin}/my-cms/${md}/${codeSpace}.html`;
};

export const useSpeedy = async (codeSpace: string) => {
  const buildWithRetry = async (entryPoint = "") => {
    try {
      return await build({
        codeSpace,
        splitting: true,
        entryPoint,
        origin: location.origin,
        format: "esm",
      });
    } catch (e) {
      console.error("Build failed, retrying after 1 second:", e);
      await wait(1000);
      return await build({
        codeSpace,
        splitting: true,
        entryPoint,
        origin: location.origin,
        format: "esm",
      });
    }
  };

  // function base64convert (files) {
  //   console.clear()
  //   const reader = new FileReader()
  //   reader.onload = (e) => {
  //     console.log(e.target.result)
  //   }
  //   reader.readAsDataURL(files[0])
  // }

  // const indexCss = await buildWithRetry(origin + `/live/${codeSpace}/index.css`);

  const indexMjs = (await buildWithRetry()) as unknown as {
    contents: Uint8Array;
    path: string;
    text: string;
  }[];

  console.log({ indexMjs });

  const gJunk = await fetch(`/assets/g-chunk-72a597.css`).then((res) => res.text());

  //   if (indexCss.length > 0 ) {
  //   const assets = indexCss.filter((f) => f.path.includes("/assets/"));
  //  assets.forEach(async (f) => {
  //     const assetU8Array = f.contents;
  //     const base64TTF = btoa(String.fromCharCode(...assetU8Array));
  //     const path = f.path.split("api/my-cms").pop();
  //     css= css.split(path).join(`data:font/ttf;base64,${base64TTF}`);
  //   });}

  const getMimeType = (extension: string) => {
    const mimeTypes: { [key: string]: string } = {
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
      try {
        const body = f.contents;
        const extension = f.path.split(".").pop() as string;
        const mimeType = getMimeType(extension);

        const response = await fetch(f.path.slice(1), {
          method: "PUT",
          body,
          headers: { "Content-Type": mimeType },
        });

        if (!response.ok) {
          console.error(
            `Failed to upload font: ${f.path}, Status: ${response.status}`,
          );
        }
      } catch (error) {
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

  const twJS = await fetch(`/assets/tw-chunk-be5bad.js`).then((res) => res.text());
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
  <style>
    ${gJunk}
  </style>
  <style>  
    ${updatedCss}
  </style>
</head>
<body>
  <div id="embed">${htm}</div>
  <script type="module">
  ${indexMjs[0].text.split("@import url(").join("//@import url(")}
  </script>
  <script>
    ${twJS}
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

  console.log(`${window.location.origin}/my-cms/${md}/${codeSpace}.html`);
};
