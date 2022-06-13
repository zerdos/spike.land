"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeUpdate = void 0;
var invokeUpdate = function (progress, options) {
  var _a;
  var textual = "".concat(progress.type, ": ");
  switch (progress.type) {
    case "CodeChanged":
      textual += "";
      break;
    case "ResolveNewImports":
      textual += "";
      break;
    // case 'DetectedImport':
    //   textual += `at "${progress.source}" the import "${progress.importPath}" was detected`;
    //   break;
    // case 'CompletedImport':
    //   textual += `at "${progress.source}" the import "${progress.importPath}" was completed`;
    //   break;
    case "LookedUpTypeFile":
      textual += '"'.concat(progress.path, '" was ').concat(
        progress.success ? "sucessfully" : "not sucessfully",
        " looked up",
      );
      break;
    case "AttemptedLookUpFile":
      textual += '"'.concat(progress.path, '" was ').concat(
        progress.success ? "sucessfully" : "not sucessfully",
        " attempted to looked up",
      );
      break;
    case "LookedUpPackage":
      textual += 'package.json for package "'.concat(progress.package, '" was ')
        .concat(
          progress.success ? "sucessfully" : "not sucessfully",
          " looked up",
        ).concat(
          progress.definitelyTyped ? " (found in definitely typed repo)" : "",
        );
      break;
    case "LoadedFromCache":
      textual += '"'.concat(progress.importPath, '" was loaded from cache');
      break;
    case "StoredToCache":
      textual += '"'.concat(progress.importPath, '" was stored to cache');
      break;
  }
  if (textual.endsWith(": ")) {
    textual = textual.slice(undefined, -2);
  }
  (_a = options.onUpdate) === null || _a === void 0
    ? void 0
    : _a.call(options, progress, textual);
};
exports.invokeUpdate = invokeUpdate;
