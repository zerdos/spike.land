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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoTypings = void 0;
var DummySourceCache_1 = require("./DummySourceCache");
var UnpkgSourceResolver_1 = require("./UnpkgSourceResolver");
var ImportResolver_1 = require("./ImportResolver");
var path = __importStar(require("path"));
var invokeUpdate_1 = require("./invokeUpdate");
var RecursionDepth_1 = require("./RecursionDepth");
var AutoTypings = /** @class */ (function () {
    function AutoTypings(editor, options, languages) {
        var _this = this;
        this.editor = editor;
        this.options = options;
        this.languages = languages;
        this.disposables = [];
        this.importResolver = new ImportResolver_1.ImportResolver(options);
        var changeModelDisposable = editor.onDidChangeModelContent(function (e) {
            _this.debouncedResolveContents();
        });
        this.disposables.push(changeModelDisposable);
        this.resolveContents();
        if (!options.dontAdaptEditorOptions) {
            languages.typescript.typescriptDefaults.setCompilerOptions(__assign(__assign({}, languages.typescript.typescriptDefaults.getCompilerOptions()), { moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs, allowSyntheticDefaultImports: true }));
        }
    }
    AutoTypings.create = function (editor, languages, options) {
        var _a;
        if ((options === null || options === void 0 ? void 0 : options.shareCache) && options.sourceCache && !AutoTypings.sharedCache) {
            AutoTypings.sharedCache = options.sourceCache;
        }
        return new AutoTypings(editor, __assign({ fileRootPath: "inmemory://model/", onlySpecifiedPackages: false, preloadPackages: false, shareCache: false, dontAdaptEditorOptions: false, dontRefreshModelValueAfterResolvement: false, sourceCache: (_a = AutoTypings.sharedCache) !== null && _a !== void 0 ? _a : new DummySourceCache_1.DummySourceCache(), sourceResolver: new UnpkgSourceResolver_1.UnpkgSourceResolver(), debounceDuration: 4000, fileRecursionDepth: 10, packageRecursionDepth: 3 }, options), languages);
    };
    AutoTypings.prototype.dispose = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.disposables), _c = _b.next(); !_c.done; _c = _b.next()) {
                var disposable = _c.value;
                disposable.dispose();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    AutoTypings.prototype.setVersions = function (versions) {
        this.importResolver.setVersions(versions);
        this.options.versions = versions;
    };
    AutoTypings.prototype.clearCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.options.sourceCache.clear()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AutoTypings.prototype.debouncedResolveContents = function () {
        var _this = this;
        if (this.isResolving) {
            return;
        }
        (0, invokeUpdate_1.invokeUpdate)({
            type: "CodeChanged",
        }, this.options);
        if (this.options.debounceDuration <= 0) {
            this.resolveContents();
        }
        else {
            if (this.debounceTimer !== undefined) {
                clearTimeout(this.debounceTimer);
            }
            this.debounceTimer = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.resolveContents()];
                        case 1:
                            _a.sent();
                            this.debounceTimer = undefined;
                            return [2 /*return*/];
                    }
                });
            }); }, this.options.debounceDuration);
        }
    };
    AutoTypings.prototype.resolveContents = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var model, content, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.isResolving = true;
                        (0, invokeUpdate_1.invokeUpdate)({
                            type: "ResolveNewImports",
                        }, this.options);
                        model = this.editor.getModel();
                        if (!model) {
                            throw Error("No model");
                        }
                        content = model.getLinesContent();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.importResolver.resolveImportsInFile(content.join("\n"), path.dirname(model.uri.toString()), new RecursionDepth_1.RecursionDepth(this.options))];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _b.sent();
                        if (this.options.onError) {
                            this.options.onError((_a = e_2.message) !== null && _a !== void 0 ? _a : e_2);
                        }
                        else {
                            throw e_2;
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        if (this.importResolver.wereNewImportsResolved()) {
                            if (!this.options.dontRefreshModelValueAfterResolvement) {
                                model.setValue(model.getValue());
                            }
                            this.importResolver.resetNewImportsResolved();
                        }
                        this.isResolving = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    return AutoTypings;
}());
exports.AutoTypings = AutoTypings;
