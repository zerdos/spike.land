import { md5 } from "@spike-land/code";
import ASSET_MANIFEST from "__STATIC_CONTENT_MANIFEST";

export { ASSET_MANIFEST };
// const assets = JSON.parse(                              );

const f = JSON.parse(ASSET_MANIFEST);
export const ASSET_HASH = md5(Object.values(f).join(""));
export const files = {...f, ASSET_HASH};
// let files = {};)

// Object.keys(assets).forEach((file) => files = { ...files, [`/${file}`]: `/` + assets[file] });
// export { files };
// let reverseMap = {};

// Object.keys(files).forEach((file) => reverseMap = { ...reverseMap, [files[file]]: file });
// export { reverseMap };
// export { ASSET_MANIFEST };
// export const getFilePath = (file) => reverseMap[file] ? file : files[file];
