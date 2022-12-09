"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASSET_HASH = exports.getFilePath = exports.ASSET_MANIFEST = exports.reverseMap = exports.files = void 0;
const tslib_1 = require("tslib");
const session_1 = require("@spike.land/code/js/session");
const __STATIC_CONTENT_MANIFEST_1 = tslib_1.__importDefault(require("__STATIC_CONTENT_MANIFEST"));
exports.ASSET_MANIFEST = __STATIC_CONTENT_MANIFEST_1.default;
const assets = JSON.parse(__STATIC_CONTENT_MANIFEST_1.default);
let files = {};
exports.files = files;
Object.keys(assets).forEach((file) => exports.files = files = { ...files, [`/${file}`]: `/` + assets[file] });
let reverseMap = {};
exports.reverseMap = reverseMap;
Object.keys(files).forEach((file) => exports.reverseMap = reverseMap = { ...reverseMap, [files[file]]: file });
const getFilePath = (file) => reverseMap[file] ? file : files[file];
exports.getFilePath = getFilePath;
exports.ASSET_HASH = (0, session_1.md5)(__STATIC_CONTENT_MANIFEST_1.default);
//# sourceMappingURL=staticContent.mjs.map