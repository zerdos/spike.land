// import { sha256, shaDB } from "@spike.land/shadb";
// import { getEditorHTML, getHtml } from "../dist/templates.mjs";

/**
 * @param {{
 * code: string
 * html: string
 * transpiled: string
 * }} props
 */
export const shareItAsHtml = async ({ room }) => {
  // const allContent = [
  //   {
  //     path: "/app/index.html",
  //     content: getHtml({ html, css, transpiled }),
  //   },
  //   { path: "/app/app.js", content: transpiled },
  //   { path: "/app/app.tsx", content: code },
  //   { path: "/app/edit/index.html", content: getEditorHTML() },
  // ];

  // const sha = await sha256(JSON.stringify(allContent));
  // let rootUrl = await shaDB.get(sha, "string");

  // if (rootUrl === null) {
  // const res = await addAll(
  //   allContent,
  // );

  // const appDir = res.find(
  //   (x) => x.path === "app",
  // );
  // if (typeof appDir === "undefined") return null;

  // rootUrl = `https://ipfs.io/ipfs/${appDir.CID}`;

  // const { pathname } = new URL(window.location.href);

  // if (pathname.endsWith("/edit/") || pathname.endsWith("/edit")) {
  //   history.pushState({}, "", `/ipfs/${appDir.CID}/edit/`);
  // }

  // await shaDB.put(sha, rootUrl);
  // }

  // const preLoad = async (retry = 3) => {
  //   try {
  //     await Promise.all([
  //       fetch(`${rootUrl}/app.js`).then((x) => x.text()),
  //       fetch(`${rootUrl}/edit/index.html`).then((x) => x.text()),
  //       fetch(rootUrl).then((x) => x.text()),
  //     ]);
  //   } catch {
  //     if (retry > 0) return preLoad(retry - 1);
  //   }
  // };
  // preLoad(3);
  // await saveHtml(
  //   getHtml({ HTML, css, link: linkToCode }),
  // );

  return `https://code.spike.land/api/room/${room}/public`;
};

/**
 * @param {{ path: string; content: any; }[]} files
 */
// async function addAll(files) {
//   // const { all, ipfsClient } = await import("./ipfsClient.mjs");

//   // const res = [];

//   // for await (const result of ipfsClient.addAll(files)) {
//   //   const { path, cid } = result;
//   //   const CID = cid.toString();
//   //   res.push({ path, CID });
//   // }
//   try {
//     // const res = await all(ipfsClient.addAll(files));

//     // for await (const result of ) {
//     //   const { path, cid } = result;
//     //   const CID = cid.toString();
//     //   res.push({ path, CID });
//     // }

//     return res.map((r) => {
//       const CID = r.cid.toString();

//       return { path: r.path, CID };
//     });
//   } catch (e) {
//     console.error({ error: e });
//   }

//   // return res;
// }
