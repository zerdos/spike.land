"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecursionDepth = void 0;
var RecursionDepth = /** @class */ (function () {
  function RecursionDepth(options, fileRecursionDepth, packageRecursionDepth) {
    if (fileRecursionDepth === void 0) fileRecursionDepth = 0;
    if (packageRecursionDepth === void 0) packageRecursionDepth = 0;
    this.options = options;
    this.fileRecursionDepth = fileRecursionDepth;
    this.packageRecursionDepth = packageRecursionDepth;
  }
  RecursionDepth.prototype.nextPackage = function () {
    return new RecursionDepth(
      this.options,
      this.fileRecursionDepth,
      this.packageRecursionDepth + 1,
    );
  };
  RecursionDepth.prototype.nextFile = function () {
    return new RecursionDepth(
      this.options,
      this.fileRecursionDepth + 1,
      this.packageRecursionDepth,
    );
  };
  RecursionDepth.prototype.same = function () {
    return new RecursionDepth(
      this.options,
      this.fileRecursionDepth,
      this.packageRecursionDepth,
    );
  };
  RecursionDepth.prototype.shouldStop = function () {
    return ((this.options.fileRecursionDepth > 0 &&
      this.fileRecursionDepth >= this.options.fileRecursionDepth) ||
      (this.options.packageRecursionDepth > 0 &&
        this.packageRecursionDepth >= this.options.packageRecursionDepth));
  };
  return RecursionDepth;
}());
exports.RecursionDepth = RecursionDepth;
