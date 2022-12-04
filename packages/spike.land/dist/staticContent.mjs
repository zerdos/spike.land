import { md5 } from "@spike.land/code/js/session";
import ASSET_MANIFEST from "__STATIC_CONTENT_MANIFEST";
export const files = JSON.parse(ASSET_MANIFEST);
let reverseMap = {};
Object.keys(files).forEach((file) => reverseMap = { ...reverseMap, [files[file]]: file });
export { ASSET_MANIFEST };
export const getFilePath = (file) => reverseMap[file] ? file : files[file];
export const ASSET_HASH = md5(ASSET_MANIFEST);
