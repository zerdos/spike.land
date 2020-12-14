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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const http_1 = require("http");
const os_1 = require("os");
const parseGitConfig = require("parse-git-config");
const path_1 = require("path");
const url_1 = require("url");
const names_1 = require("./names");
function writeDefinitelyTypedPackage(indexDtsContent, packageName, overwrite) {
    const dtName = names_1.getDTName(packageName);
    const packageDir = path_1.join("types", dtName);
    // Check for overwrite
    if (!overwrite) {
        if (fs_1.existsSync(packageDir)) {
            console.log(`Directory ${packageDir} already exists and --overwrite was not specified; exiting.`);
            process.exit(2);
        }
    }
    if (!fs_1.existsSync(packageDir)) {
        fs_1.mkdirSync(packageDir);
    }
    run(indexDtsContent, packageName, dtName, packageDir).catch((e) => {
        console.error(e);
        process.exit(1);
    });
}
exports.default = writeDefinitelyTypedPackage;
function run(indexDtsContent, packageName, dtName, packageDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = [
            ["index.d.ts", yield getIndex(indexDtsContent, packageName)],
            [`${dtName}-tests.ts`, ""],
            ["tsconfig.json", `${JSON.stringify(getTSConfig(dtName), undefined, 4)}\n`],
            ["tslint.json", '{ "extends": "dtslint/dt.json" }\n'],
        ];
        for (const [name, text] of files) {
            fs_1.writeFileSync(path_1.join(packageDir, name), text, "utf-8");
        }
    });
}
function getIndex(content, packageName) {
    return __awaiter(this, void 0, void 0, function* () {
        let version = "x.x";
        let project = "https://github.com/baz/foo " +
            "(Does not have to be to GitHub, " +
            "but prefer linking to a source code repository rather than to a project website.)";
        try {
            const reg = JSON.parse(yield loadString(`http://registry.npmjs.org/${packageName}`));
            const { latest } = reg["dist-tags"];
            const { homepage } = reg.versions[latest];
            version = latest.split(".").slice(0, 2).join("."); // Just major.minor
            if (homepage !== undefined)
                project = homepage;
        }
        catch (e) {
            console.warn(`Warning: Could not retrieve version/homepage information: ${e.message}`);
        }
        let authorName = "My Self";
        try {
            const globalGitConfig = parseGitConfig.sync({ cwd: os_1.homedir(), path: ".gitconfig" });
            if (globalGitConfig.user && globalGitConfig.user.name) {
                authorName = globalGitConfig.user.name;
            }
        }
        catch (e) {
            console.warn(`Warning: Could not retrieve author name: ${e.message}`);
        }
        let authorUserName = "me";
        try {
            const repoGitConfig = parseGitConfig.sync({ path: path_1.join(".git", "config") });
            if (repoGitConfig['remote "origin"'] && repoGitConfig['remote "origin"'].url) {
                const url = url_1.parse(repoGitConfig['remote "origin"'].url);
                if (url.hostname === "github.com" && url.pathname) {
                    authorUserName = url.pathname.split("/")[1] || authorUserName;
                }
            }
        }
        catch (e) {
            console.warn(`Warning: Could not retrieve author's user name: ${e.message}`);
        }
        const authorUrl = url_1.format({
            protocol: "https",
            hostname: "github.com",
            pathname: authorUserName,
        });
        return `// Type definitions for ${packageName} ${version}
// Project: ${project}
// Definitions by: ${authorName} <${authorUrl}>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

${content}`;
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
            forceConsistentCasingInFileNames: true,
        },
        files: [
            "index.d.ts",
            `${dtName}-tests.ts`,
        ],
    };
}
function loadString(url) {
    return new Promise((resolve, reject) => {
        http_1.get(url, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`HTTP Error ${res.statusCode}: ${http_1.STATUS_CODES[res.statusCode || 500]} for ${url}`));
            }
            let rawData = "";
            res.on("data", (chunk) => rawData += chunk);
            res.on("end", () => resolve(rawData));
        }).on("error", (e) => reject(e));
    });
}
