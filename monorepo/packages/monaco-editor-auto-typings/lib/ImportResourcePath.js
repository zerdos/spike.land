"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importResourcePathToString = void 0;
var path_1 = __importDefault(require("path"));
var importResourcePathToString = function (p) {
    var _a;
    switch (p.kind) {
        case "package":
            return path_1.default.join(p.packageName, (_a = p.importPath) !== null && _a !== void 0 ? _a : "", "package.json");
        case "relative":
            return path_1.default.join(p.sourcePath, p.importPath);
        case "relative-in-package":
            return path_1.default.join(p.packageName, p.sourcePath, p.importPath);
    }
};
exports.importResourcePathToString = importResourcePathToString;
