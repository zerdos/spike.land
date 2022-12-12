"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASSET_HASH = exports.files = exports.ASSET_MANIFEST = void 0;
const tslib_1 = require("tslib");
const session_1 = require("@spike.land/code/js/session");
const __STATIC_CONTENT_MANIFEST_1 = tslib_1.__importDefault(require("__STATIC_CONTENT_MANIFEST"));
exports.ASSET_MANIFEST = __STATIC_CONTENT_MANIFEST_1.default;
// const assets = JSON.parse(                              );
exports.files = JSON.parse(__STATIC_CONTENT_MANIFEST_1.default);
// Object.keys(assets).forEach((file) => files = { ...files, [`/${file}`]: `/` + assets[file] });
// export { files };
// let reverseMap = {};
// Object.keys(files).forEach((file) => reverseMap = { ...reverseMap, [files[file]]: file });
// export { reverseMap };
// export { ASSET_MANIFEST };
// export const getFilePath = (file) => reverseMap[file] ? file : files[file];
exports.ASSET_HASH = (0, session_1.md5)(__STATIC_CONTENT_MANIFEST_1.default);
//# sourceMappingURL=staticContent.mjs.map