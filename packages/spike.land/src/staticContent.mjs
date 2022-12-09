import { md5 } from "@spike.land/code/js/session";
import ASSET_MANIFEST from "__STATIC_CONTENT_MANIFEST";

const assets = JSON.parse(ASSET_MANIFEST);

export const files = assets;
// Object.keys(assets).forEach((file) => files = { ...files, [`/${file}`]: `/` + assets[file] });
// export { files };
let reverseMap = {};

Object.keys(files).forEach((file) => reverseMap = { ...reverseMap, [files[file]]: file });
export { reverseMap };
export { ASSET_MANIFEST };
export const getFilePath = (file) => reverseMap[file] ? file : files[file];
export const ASSET_HASH = md5(ASSET_MANIFEST);
