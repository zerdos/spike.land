import { md5 } from "@spike-land/code";
import ASSET_MANIFEST from "__STATIC_CONTENT_MANIFEST";

export { ASSET_MANIFEST };
// const assets = JSON.parse(                              );

const f = JSON.parse(ASSET_MANIFEST);
export const ASSET_HASH = md5(Object.values(f).join(""));
export const files = {...f, ASSET_HASH};