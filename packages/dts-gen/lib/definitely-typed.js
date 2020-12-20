"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var http_1 = require("http");
var os_1 = require("os");
var parseGitConfig = require("parse-git-config");
var path_1 = require("path");
var url_1 = require("url");
var names_1 = require("./names");
function writeDefinitelyTypedPackage(indexDtsContent, packageName, overwrite) {
    var dtName = names_1.getDTName(packageName);
    var packageDir = path_1.join("types", dtName);
    // Check for overwrite
    if (!overwrite) {
        if (fs_1.existsSync(packageDir)) {
            console.log("Directory " + packageDir + " already exists and --overwrite was not specified; exiting.");
            process.exit(2);
        }
    }
    if (!fs_1.existsSync(packageDir)) {
        fs_1.mkdirSync(packageDir);
    }
    run(indexDtsContent, packageName, dtName, packageDir)["catch"](function (e) {
        console.error(e);
        process.exit(1);
    });
}
exports["default"] = writeDefinitelyTypedPackage;
function run(indexDtsContent, packageName, dtName, packageDir) {
    return __awaiter(this, void 0, void 0, function () {
        var files, _a, _i, files_1, _b, name_1, text;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = ["index.d.ts"];
                    return [4 /*yield*/, getIndex(indexDtsContent, packageName)];
                case 1:
                    files = [
                        _a.concat([_c.sent()]),
                        [dtName + "-tests.ts", ""],
                        ["tsconfig.json", JSON.stringify(getTSConfig(dtName), undefined, 4) + "\n"],
                        ["tslint.json", '{ "extends": "dtslint/dt.json" }\n']
                    ];
                    for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                        _b = files_1[_i], name_1 = _b[0], text = _b[1];
                        fs_1.writeFileSync(path_1.join(packageDir, name_1), text, "utf-8");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getIndex(content, packageName) {
    return __awaiter(this, void 0, void 0, function () {
        var version, project, reg, _a, _b, latest, homepage, e_1, authorName, globalGitConfig, authorUserName, repoGitConfig, url, authorUrl;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    version = "x.x";
                    project = "https://github.com/baz/foo " +
                        "(Does not have to be to GitHub, " +
                        "but prefer linking to a source code repository rather than to a project website.)";
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, loadString("http://registry.npmjs.org/" + packageName)];
                case 2:
                    reg = _b.apply(_a, [_c.sent()]);
                    latest = reg["dist-tags"].latest;
                    homepage = reg.versions[latest].homepage;
                    version = latest.split(".").slice(0, 2).join("."); // Just major.minor
                    if (homepage !== undefined)
                        project = homepage;
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _c.sent();
                    console.warn("Warning: Could not retrieve version/homepage information: " + e_1.message);
                    return [3 /*break*/, 4];
                case 4:
                    authorName = "My Self";
                    try {
                        globalGitConfig = parseGitConfig.sync({ cwd: os_1.homedir(), path: ".gitconfig" });
                        if (globalGitConfig.user && globalGitConfig.user.name) {
                            authorName = globalGitConfig.user.name;
                        }
                    }
                    catch (e) {
                        console.warn("Warning: Could not retrieve author name: " + e.message);
                    }
                    authorUserName = "me";
                    try {
                        repoGitConfig = parseGitConfig.sync({ path: path_1.join(".git", "config") });
                        if (repoGitConfig['remote "origin"'] && repoGitConfig['remote "origin"'].url) {
                            url = url_1.parse(repoGitConfig['remote "origin"'].url);
                            if (url.hostname === "github.com" && url.pathname) {
                                authorUserName = url.pathname.split("/")[1] || authorUserName;
                            }
                        }
                    }
                    catch (e) {
                        console.warn("Warning: Could not retrieve author's user name: " + e.message);
                    }
                    authorUrl = url_1.format({
                        protocol: "https",
                        hostname: "github.com",
                        pathname: authorUserName
                    });
                    return [2 /*return*/, "// Type definitions for " + packageName + " " + version + "\n// Project: " + project + "\n// Definitions by: " + authorName + " <" + authorUrl + ">\n// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped\n\n" + content];
            }
        });
    });
}
function getTSConfig(dtName) {
    return {
        compilerOptions: {
            module: "commonjs",
            lib: ["es6"],
            noImplicitAny: true,
            noImplicitThis: true,
            strictFunctionTypes: true,
            strictNullChecks: true,
            baseUrl: "../",
            typeRoots: ["../"],
            types: [],
            noEmit: true,
            forceConsistentCasingInFileNames: true
        },
        files: [
            "index.d.ts",
            dtName + "-tests.ts",
        ]
    };
}
function loadString(url) {
    return new Promise(function (resolve, reject) {
        http_1.get(url, function (res) {
            if (res.statusCode !== 200) {
                return reject(new Error("HTTP Error " + res.statusCode + ": " + http_1.STATUS_CODES[res.statusCode || 500] + " for " + url));
            }
            var rawData = "";
            res.on("data", function (chunk) { return rawData += chunk; });
            res.on("end", function () { return resolve(rawData); });
        }).on("error", function (e) { return reject(e); });
    });
}
