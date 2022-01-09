"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportResolver = void 0;
var DependencyParser_1 = require("./DependencyParser");
var ImportResourcePath_1 = require("./ImportResourcePath");
var path = __importStar(require("path-browserify"));
var invokeUpdate_1 = require("./invokeUpdate");
var RecursionDepth_1 = require("./RecursionDepth");
// @ts-expect-error
var Uri = window.monaco.Uri;
var ImportResolver = /** @class */ (function () {
    function ImportResolver(options) {
        var e_1, _a;
        this.options = options;
        this.loadedFiles = [];
        this.dependencyParser = new DependencyParser_1.DependencyParser();
        this.cache = options.sourceCache;
        this.sourceResolver = options.sourceResolver;
        this.newImportsResolved = false;
        if (options.preloadPackages && options.versions) {
            try {
                for (var _b = __values(Object.entries(options.versions)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), packageName = _d[0], version = _d[1];
                    this.resolveImport({
                        kind: 'package',
                        packageName: packageName,
                        importPath: '',
                    }, new RecursionDepth_1.RecursionDepth(this.options)).catch(function (e) {
                        console.error(e);
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    }
    ImportResolver.prototype.wereNewImportsResolved = function () {
        return this.newImportsResolved;
    };
    ImportResolver.prototype.resetNewImportsResolved = function () {
        this.newImportsResolved = false;
    };
    ImportResolver.prototype.resolveImportsInFile = function (source, parent, depth) {
        return __awaiter(this, void 0, void 0, function () {
            var imports, imports_1, imports_1_1, importCall, e_2, e_3_1;
            var e_3, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (depth.shouldStop()) {
                            return [2 /*return*/];
                        }
                        imports = this.dependencyParser.parseDependencies(source, parent);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, 9, 10]);
                        imports_1 = __values(imports), imports_1_1 = imports_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!imports_1_1.done) return [3 /*break*/, 7];
                        importCall = imports_1_1.value;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.resolveImport(importCall, depth)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _b.sent();
                        console.error(e_2);
                        return [3 /*break*/, 6];
                    case 6:
                        imports_1_1 = imports_1.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_3_1 = _b.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (imports_1_1 && !imports_1_1.done && (_a = imports_1.return)) _a.call(imports_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ImportResolver.prototype.resolveImport = function (importResource, depth) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, _a, packageRelativeImport;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        hash = this.hashImportResourcePath(importResource);
                        if (this.loadedFiles.includes(hash)) {
                            return [2 /*return*/];
                        }
                        this.loadedFiles.push(hash);
                        _a = importResource.kind;
                        switch (_a) {
                            case 'package': return [3 /*break*/, 1];
                            case 'relative': return [3 /*break*/, 5];
                            case 'relative-in-package': return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 8];
                    case 1: return [4 /*yield*/, this.resolveImportFromPackageRoot(importResource)];
                    case 2:
                        packageRelativeImport = _b.sent();
                        if (!packageRelativeImport) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.resolveImportInPackage(packageRelativeImport, depth.nextPackage().nextFile())];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4: return [3 /*break*/, 8];
                    case 5: throw Error('Not implemented yet');
                    case 6: return [4 /*yield*/, this.resolveImportInPackage(importResource, depth.nextFile())];
                    case 7: return [2 /*return*/, _b.sent()];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ImportResolver.prototype.resolveImportInPackage = function (importResource, depth) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, source, at;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.loadSourceFileContents(importResource)];
                    case 1:
                        _a = _b.sent(), source = _a.source, at = _a.at;
                        this.createModel(source, 
                        // @ts-expect-error
                        Uri.parse(this.options.fileRootPath + path.join("node_modules/".concat(importResource.packageName), at)));
                        return [4 /*yield*/, this.resolveImportsInFile(source, {
                                kind: 'relative-in-package',
                                packageName: importResource.packageName,
                                sourcePath: path.dirname(at),
                                importPath: '',
                            }, depth)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportResolver.prototype.resolveImportFromPackageRoot = function (importResource) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var failedProgressUpdate, doesPkgJsonHasSubpath, pkgJsonSubpath, pkgJson, pkg, typings, typingPackageName, pkgJsonTypings, pkg_1, typings;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        failedProgressUpdate = {
                            type: 'LookedUpPackage',
                            package: importResource.packageName,
                            definitelyTyped: false,
                            success: false,
                        };
                        if (this.options.onlySpecifiedPackages) {
                            if (!((_a = this.versions) === null || _a === void 0 ? void 0 : _a[importResource.packageName]) && !((_b = this.versions) === null || _b === void 0 ? void 0 : _b['@types/' + importResource.packageName])) {
                                (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                                return [2 /*return*/];
                            }
                        }
                        doesPkgJsonHasSubpath = (_d = (_c = importResource.importPath) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0 > 0;
                        pkgJsonSubpath = doesPkgJsonHasSubpath ? "/".concat(importResource.importPath) : '';
                        return [4 /*yield*/, this.resolvePackageJson(importResource.packageName, (_e = this.versions) === null || _e === void 0 ? void 0 : _e[importResource.packageName], doesPkgJsonHasSubpath ? importResource.importPath : undefined)];
                    case 1:
                        pkgJson = _k.sent();
                        if (!(!pkgJson && doesPkgJsonHasSubpath)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.resolvePackageJson(importResource.packageName, (_f = this.versions) === null || _f === void 0 ? void 0 : _f[importResource.packageName])];
                    case 2:
                        pkgJson = _k.sent();
                        pkgJsonSubpath = '';
                        _k.label = 3;
                    case 3:
                        if (!pkgJson) return [3 /*break*/, 7];
                        pkg = JSON.parse(pkgJson);
                        if (!(pkg.typings || pkg.types)) return [3 /*break*/, 4];
                        typings = pkg.typings || pkg.types;
                        this.createModel(pkgJson, 
                        //@ts-expect-error
                        Uri.parse("".concat(this.options.fileRootPath, "node_modules/").concat(importResource.packageName).concat(pkgJsonSubpath, "/package.json")));
                        (0, invokeUpdate_1.invokeUpdate)({
                            type: 'LookedUpPackage',
                            package: importResource.packageName,
                            definitelyTyped: false,
                            success: true,
                        }, this.options);
                        this.setVersion(importResource.packageName, pkg.version);
                        return [2 /*return*/, {
                                kind: 'relative-in-package',
                                packageName: importResource.packageName,
                                sourcePath: '',
                                importPath: path.join((_g = importResource.importPath) !== null && _g !== void 0 ? _g : '', typings.startsWith('./') ? typings.slice(2) : typings),
                            }];
                    case 4:
                        typingPackageName = "@types/".concat(importResource.packageName.startsWith('@')
                            ? importResource.packageName.slice(1).replace(/\//, '__')
                            : importResource.packageName);
                        return [4 /*yield*/, this.resolvePackageJson(typingPackageName, (_h = this.versions) === null || _h === void 0 ? void 0 : _h[typingPackageName])];
                    case 5:
                        pkgJsonTypings = _k.sent();
                        if (pkgJsonTypings) {
                            pkg_1 = JSON.parse(pkgJsonTypings);
                            if (pkg_1.typings || pkg_1.types) {
                                typings = pkg_1.typings || pkg_1.types;
                                this.createModel(pkgJsonTypings, 
                                // @ts-expect-error
                                Uri.parse("".concat(this.options.fileRootPath, "node_modules/").concat(typingPackageName, "/package.json")));
                                (0, invokeUpdate_1.invokeUpdate)({
                                    type: 'LookedUpPackage',
                                    package: typingPackageName,
                                    definitelyTyped: true,
                                    success: true,
                                }, this.options);
                                this.setVersion(typingPackageName, pkg_1.version);
                                return [2 /*return*/, {
                                        kind: 'relative-in-package',
                                        packageName: typingPackageName,
                                        sourcePath: '',
                                        importPath: path.join((_j = importResource.importPath) !== null && _j !== void 0 ? _j : '', typings.startsWith('./') ? typings.slice(2) : typings),
                                    }];
                            }
                            else {
                                (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                            }
                        }
                        else {
                            (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                        }
                        _k.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                        _k.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ImportResolver.prototype.loadSourceFileContents = function (importResource) {
        return __awaiter(this, void 0, void 0, function () {
            var progressUpdatePath, failedProgressUpdate, pkgName, version, appends, source, appends_1, appends_1_1, append, fullPath, source, e_4_1, pkgJson, types, fullPath, source;
            var e_4, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        progressUpdatePath = path.join(importResource.packageName, importResource.sourcePath, importResource.importPath);
                        failedProgressUpdate = {
                            type: 'LookedUpTypeFile',
                            path: progressUpdatePath,
                            definitelyTyped: false,
                            success: false,
                        };
                        pkgName = importResource.packageName;
                        version = this.getVersion(importResource.packageName);
                        appends = ['.d.ts', '/index.d.ts', '.ts', '.tsx', '/index.ts', '/index.tsx'];
                        if (!appends.map(function (append) { return importResource.importPath.endsWith(append); }).reduce(function (a, b) { return a || b; }, false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.resolveSourceFile(pkgName, version, path.join(importResource.sourcePath, importResource.importPath))];
                    case 1:
                        source = _b.sent();
                        if (source) {
                            return [2 /*return*/, { source: source, at: path.join(importResource.sourcePath, importResource.importPath) }];
                        }
                        return [3 /*break*/, 9];
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        appends_1 = __values(appends), appends_1_1 = appends_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!appends_1_1.done) return [3 /*break*/, 6];
                        append = appends_1_1.value;
                        fullPath = path.join(importResource.sourcePath, importResource.importPath) + append;
                        return [4 /*yield*/, this.resolveSourceFile(pkgName, version, fullPath)];
                    case 4:
                        source = _b.sent();
                        (0, invokeUpdate_1.invokeUpdate)({
                            type: 'AttemptedLookUpFile',
                            path: path.join(pkgName, fullPath),
                            success: !!source,
                        }, this.options);
                        if (source) {
                            (0, invokeUpdate_1.invokeUpdate)({
                                type: 'LookedUpTypeFile',
                                path: path.join(pkgName, fullPath),
                                success: true,
                            }, this.options);
                            return [2 /*return*/, { source: source, at: fullPath }];
                        }
                        _b.label = 5;
                    case 5:
                        appends_1_1 = appends_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_4_1 = _b.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (appends_1_1 && !appends_1_1.done && (_a = appends_1.return)) _a.call(appends_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 9: return [4 /*yield*/, this.resolvePackageJson(pkgName, version, path.join(importResource.sourcePath, importResource.importPath))];
                    case 10:
                        pkgJson = _b.sent();
                        if (!pkgJson) return [3 /*break*/, 12];
                        types = JSON.parse(pkgJson).types;
                        if (!types) return [3 /*break*/, 12];
                        fullPath = path.join(importResource.sourcePath, importResource.importPath, types);
                        return [4 /*yield*/, this.resolveSourceFile(pkgName, version, fullPath)];
                    case 11:
                        source = _b.sent();
                        if (source) {
                            (0, invokeUpdate_1.invokeUpdate)({
                                type: 'LookedUpTypeFile',
                                path: path.join(pkgName, fullPath),
                                success: true,
                            }, this.options);
                            return [2 /*return*/, { source: source, at: fullPath }];
                        }
                        _b.label = 12;
                    case 12:
                        (0, invokeUpdate_1.invokeUpdate)(failedProgressUpdate, this.options);
                        throw Error("Could not resolve ".concat(importResource.packageName, "/").concat(importResource.sourcePath).concat(importResource.importPath));
                }
            });
        });
    };
    ImportResolver.prototype.getVersion = function (packageName) {
        var _a;
        return (_a = this.versions) === null || _a === void 0 ? void 0 : _a[packageName];
    };
    ImportResolver.prototype.setVersions = function (versions) {
        var _a, _b;
        this.versions = versions;
        (_b = (_a = this.options).onUpdateVersions) === null || _b === void 0 ? void 0 : _b.call(_a, versions);
        // TODO reload packages whose version has changed
    };
    ImportResolver.prototype.setVersion = function (packageName, version) {
        var _a;
        this.setVersions(__assign(__assign({}, this.versions), (_a = {}, _a[packageName] = version, _a)));
    };
    ImportResolver.prototype.createModel = function (source, uri) {
        uri = uri.with({ path: uri.path.replace('@types/', '') });
        // @ts-expect-error
        if (!monaco.editor.getModel(uri)) {
            // @ts-expect-error
            monaco.editor.createModel(source, 'typescript', uri);
            this.newImportsResolved = true;
        }
    };
    ImportResolver.prototype.hashImportResourcePath = function (p) {
        return (0, ImportResourcePath_1.importResourcePathToString)(p);
    };
    ImportResolver.prototype.resolvePackageJson = function (packageName, version, subPath) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, isAvailable, content, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        uri = path.join(packageName + (version ? "@".concat(version) : ''), subPath !== null && subPath !== void 0 ? subPath : '', 'package.json');
                        isAvailable = false;
                        content = undefined;
                        if (!this.cache.isFileAvailable) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.cache.isFileAvailable(uri)];
                    case 1:
                        isAvailable = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.cache.getFile(uri)];
                    case 3:
                        content = _b.sent();
                        isAvailable = content !== undefined;
                        _b.label = 4;
                    case 4:
                        if (!isAvailable) return [3 /*break*/, 8];
                        if (!(content !== null && content !== void 0)) return [3 /*break*/, 5];
                        _a = content;
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.cache.getFile(uri)];
                    case 6:
                        _a = (_b.sent());
                        _b.label = 7;
                    case 7: return [2 /*return*/, _a];
                    case 8: return [4 /*yield*/, this.sourceResolver.resolvePackageJson(packageName, version, subPath)];
                    case 9:
                        content = _b.sent();
                        if (content) {
                            this.cache.storeFile(uri, content);
                        }
                        return [2 /*return*/, content];
                }
            });
        });
    };
    ImportResolver.prototype.resolveSourceFile = function (packageName, version, filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, isAvailable, content, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        uri = path.join(packageName + (version ? "@".concat(version) : ''), filePath);
                        isAvailable = false;
                        content = undefined;
                        if (!this.cache.isFileAvailable) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.cache.isFileAvailable(uri)];
                    case 1:
                        isAvailable = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.cache.getFile(uri)];
                    case 3:
                        content = _b.sent();
                        isAvailable = content !== undefined;
                        _b.label = 4;
                    case 4:
                        if (!isAvailable) return [3 /*break*/, 8];
                        (0, invokeUpdate_1.invokeUpdate)({
                            type: 'LoadedFromCache',
                            importPath: uri,
                        }, this.options);
                        if (!(content !== null && content !== void 0)) return [3 /*break*/, 5];
                        _a = content;
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.cache.getFile(uri)];
                    case 6:
                        _a = (_b.sent());
                        _b.label = 7;
                    case 7: return [2 /*return*/, _a];
                    case 8: return [4 /*yield*/, this.sourceResolver.resolveSourceFile(packageName, version, filePath)];
                    case 9:
                        content = _b.sent();
                        if (content) {
                            (0, invokeUpdate_1.invokeUpdate)({
                                type: 'StoredToCache',
                                importPath: uri,
                            }, this.options);
                            this.cache.storeFile(uri, content);
                        }
                        return [2 /*return*/, content];
                }
            });
        });
    };
    return ImportResolver;
}());
exports.ImportResolver = ImportResolver;
