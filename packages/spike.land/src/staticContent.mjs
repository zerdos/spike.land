import { md5 } from "@spike-npm-land/code";
import ASSET_MANIFEST from "__STATIC_CONTENT_MANIFEST";

export { ASSET_MANIFEST };
// const assets = JSON.parse(                              );

const f = JSON.parse(ASSET_MANIFEST);
export const ASSET_HASH = md5(ASSET_MANIFEST);

const dynamicFiles = ["swVersion.mjs"];
dynamicFiles.forEach((file) => {
  const fileParts = file.split(".");
  const ext = fileParts.pop();
  fileParts.push(ASSET_HASH);
  fileParts.push(ext);
  const newFile = fileParts.join(".");
  f[file] = newFile;
});
export const files = f;
