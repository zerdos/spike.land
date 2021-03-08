"use strict";
var __awaiter = (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator = (this && this.__generator) || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: [],
    },
    f,
    y,
    t,
    g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) },
    typeof Symbol === "function" && (g[Symbol.iterator] = function () {
      return this;
    }),
    g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) {
      try {
        if (
          f = 1,
            y && (t = op[0] & 2
              ? y["return"]
              : op[0]
              ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
              : y.next) &&
            !(t = t.call(y, op[1])).done
        ) {
          return t;
        }
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (
              !(t = _.trys, t = t.length > 0 && t[t.length - 1]) &&
              (op[0] === 6 || op[0] === 2)
            ) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
exports.__esModule = true;
exports.DevcontainerGenerator = void 0;
var fs_1 = require("fs");
var getDistro = function (b) {
  return b === "gitpod/workspace-full"
    ? "gitpod/workspace-full"
    : b === "stretch" || b === "buster"
    ? "debian"
    : "ubuntu";
};
var softwareVersions = require("../versions.json");
var DevcontainerGenerator = /** @class */ (function () {
  function DevcontainerGenerator(base) {
    var _this = this;
    this.base = base;
    this._dockerfile = "";
    this._readme = "";
    this._dockerTemplates = {};
    this._readmeTemplates = {};
    this._templateInputs = [
      "base",
      "android",
      "git",
      "debianBackports",
      "google-chrome",
      "chromium",
      "gitUbuntu",
      "node",
      "cypress",
      "dotnet",
      "docker",
      "kubernetes",
      "dotnet3",
      "xfce",
      "noVNC",
      "xpra",
      "deno",
      "zsh",
      "vscode",
      "suffix",
    ];
    this._nodeVersion = null;
    this._gitVersion = "";
    this._cypressVersion = "";
    this._dotnet = null;
    this._xfce = false;
    this._debianBackports = false;
    this._docker = false;
    this._android = false;
    this._vscode = false;
    this._xpra = false;
    this._k8s = false;
    this._deno = false;
    this._noVNC = false;
    this._zsh = false;
    this._chromium = false;
    this._chrome = false;
    this.loadTemplate = function (filename, extension) {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4, /*yield*/
                fs_1.promises
                  .readFile(
                    __dirname + "/../../templates/" + filename + "." +
                      extension,
                  )["catch"](function (e) {
                    console.error({ e: e });
                    return "";
                  }),
              ];
            case 1:
              return [2, /*return*/ _a.sent()];
          }
        });
      });
    };
  }
  DevcontainerGenerator.init = function () {
    return __awaiter(this, void 0, void 0, function () {
      var bufferDockerfiles, bufferReadmeFiles;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4, /*yield*/
              Promise.all(this._templateInputs.map(function (fileName) {
                return __awaiter(_this, void 0, void 0, function () {
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        return [
                          4, /*yield*/
                          this.loadTemplate(fileName, "Dockerfile"),
                        ];
                      case 1:
                        return [2, /*return*/ _a.sent()];
                    }
                  });
                });
              })),
            ];
          case 1:
            bufferDockerfiles = _a.sent();
            return [
              4, /*yield*/
              Promise.all(this._templateInputs.map(function (fileName) {
                return __awaiter(_this, void 0, void 0, function () {
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        return [
                          4, /*yield*/
                          this.loadTemplate(fileName, "README"),
                        ];
                      case 1:
                        return [2, /*return*/ _a.sent()];
                    }
                  });
                });
              })),
            ];
          case 2:
            bufferReadmeFiles = _a.sent();
            this._templateInputs.forEach(function (input, index) {
              return (_this._dockerTemplates[input] = String(
                bufferDockerfiles[index],
              ));
            });
            this._templateInputs.forEach(function (input, index) {
              return (_this._readmeTemplates[input] = String(
                bufferReadmeFiles[index],
              ));
            });
            return [2, /*return*/ {
              dockerTemplates: this._dockerTemplates,
              readmeTemplates: this._readmeTemplates,
            }];
        }
      });
    });
  };
  DevcontainerGenerator.setNodeVersion = function (nodeVersion) {
    this._nodeVersion = nodeVersion;
  };
  DevcontainerGenerator.setVscode = function () {
    this._vscode = true;
  };
  DevcontainerGenerator.updateGit = function (forceFromSource) {
    if (forceFromSource === void 0) forceFromSource = false;
    if (getDistro(this.base) === "ubuntu" && !forceFromSource) {
      this._gitVersion = "ubuntu";
    } else {
      this._gitVersion = softwareVersions.git;
    }
  };
  DevcontainerGenerator.setDebianBackports = function () {
    this._debianBackports = true;
  };
  DevcontainerGenerator.setXfce = function () {
    this._xfce = true;
  };
  DevcontainerGenerator.setDeno = function () {
    this._deno = true;
  };
  DevcontainerGenerator.setK8s = function () {
    this._k8s = true;
  };
  DevcontainerGenerator.setChrome = function () {
    this._chrome = true;
  };
  DevcontainerGenerator.setChromium = function () {
    this._chromium = true;
  };
  DevcontainerGenerator.setAndroid = function () {
    this._android = true;
  };
  DevcontainerGenerator.setRemoteDesktop = function (type) {
    if (type === void 0) type = "xpra";
    if (type === "xpra") {
      this._xpra = true;
    } else {
      this._noVNC = true;
    }
    //      if ((this._noVNC===true || this._xfce) && this._xpra===true) throw new Error("You can't have VNC and Xpra on the same image");
  };
  DevcontainerGenerator.setZsh = function () {
    this._zsh = true;
  };
  DevcontainerGenerator.setDocker = function () {
    this._docker = true;
  };
  DevcontainerGenerator.setDotnet = function (version) {
    if (version === void 0) version = "2";
    this._dotnet = version;
  };
  DevcontainerGenerator.setCypress = function () {
    this._cypressVersion = softwareVersions.cypress;
  };
  DevcontainerGenerator.generate = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a, dockerTemplates, readmeTemplates, xpraStart;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4, /*yield*/ this.init()];
          case 1:
            _a = _b.sent(),
              dockerTemplates = _a.dockerTemplates,
              readmeTemplates = _a.readmeTemplates;
            this._dockerfile += dockerTemplates["base"].replace(
              "{DISTRO}",
              this.base,
            );
            this._readme += readmeTemplates["base"].replace(
              "{DISTRO}",
              this.base,
            );
            if (this._debianBackports) {
              this._dockerfile += dockerTemplates["debianBackports"]
                .replace("{DISTRO}", this.base)
                .replace("{DISTRO}", this.base);
            }
            if (this._gitVersion) {
              if (this._gitVersion === "ubuntu") {
                this._dockerfile += dockerTemplates["gitUbuntu"];
              } else {
                this._dockerfile += dockerTemplates["git"].replace(
                  "{GIT_VERSION}",
                  this._gitVersion,
                );
              }
            }
            if (this._deno) {
              this._dockerfile += dockerTemplates["deno"]
                .replace("{DENO_VERSION}", softwareVersions.deno);
              this._readme += readmeTemplates["deno"]
                .replace("{DENO_VERSION}", softwareVersions.deno);
            }
            if (this._nodeVersion) {
              this._dockerfile += dockerTemplates["node"]
                .replace(
                  "{NODE_VERSION}",
                  softwareVersions.node[this._nodeVersion],
                )
                .replace("{YARN_VERSION}", softwareVersions.yarn);
              this._readme += readmeTemplates["node"]
                .replace(
                  "{NODE_VERSION}",
                  softwareVersions.node[this._nodeVersion],
                )
                .replace("{YARN_VERSION}", softwareVersions.yarn);
            }
            if (this._dotnet) {
              if (this._dotnet === "2") {
                this._dockerfile += dockerTemplates["dotnet"]
                  .replace("{DOTNET_SDK_VERSION}", softwareVersions.dotnet)
                  .replace(
                    "{dotnet_sha512}",
                    softwareVersions.sha.dotnet_sha512["2.1.811"],
                  );
              } else if (this._dotnet === "3") {
                this._dockerfile += dockerTemplates["dotnet3"]
                  .replace("{DOTNET_SDK_VERSION}", softwareVersions.dotnet3)
                  .replace(
                    "{dotnet_sha512}",
                    softwareVersions.sha.dotnet_sha512["3.1.404"],
                  );
              } else {
                this._dockerfile += dockerTemplates["dotnet5"]
                  .replace("{DOTNET_SDK_VERSION}", softwareVersions.dotnet5)
                  .replace(
                    "{dotnet_sha512}",
                    softwareVersions.sha.dotnet_sha512["5.0.101"],
                  );
              }
            }
            if (this._cypressVersion) {
              this._dockerfile += dockerTemplates["cypress"].replace(
                "{CYPRESS_VERSION}",
                this._cypressVersion,
              );
              this._readme += readmeTemplates["cypress"].replace(
                "{CYPRESS_VERSION}",
                this._cypressVersion,
              );
            }
            if (this._xpra) {
              this._dockerfile += dockerTemplates["xpra"].replace(
                /{XPRADISTRO}/g,
                this.base,
              );
              this._readme += readmeTemplates["xpra"];
              xpraStart = "xpra start --start=xterm";
              if (this._xfce) {
                this._dockerfile += dockerTemplates["xfce"];
                this._readme += readmeTemplates["xfce"];
                xpraStart = "xpra start-desktop --start=xfce4-session";
              }
              this._dockerfile += '\nRUN echo "' + xpraStart +
                ' --html=on --bind-tcp=0.0.0.0:14500 --daemon=no --encoding=x264" > /usr/bin/startx\n';
              if (this._vscode) {
                this._dockerfile += dockerTemplates["vscode"];
                this._readme += readmeTemplates["vscode"];
              }
            } else if (this._noVNC) {
              this._dockerfile += dockerTemplates["noVNC"];
              this._readme += readmeTemplates["noVNC"];
              if (this._xfce) {
                this._dockerfile += dockerTemplates["xfce"];
                this._readme += readmeTemplates["xfce"];
              }
            }
            if (this._chrome) {
              this._dockerfile += dockerTemplates["google-chrome"].replace(
                "{CHROMIUM}",
                getDistro(this.base) === "debian" ? "chromium" : "firefox",
              );
              this._readme += readmeTemplates["google-chrome"];
            }
            if (this._chromium) {
              this._dockerfile += dockerTemplates["chromium"].replace(
                "{CHROMIUM}",
                getDistro(this.base) === "debian" ? "chromium" : "firefox",
              );
              this._readme += readmeTemplates["chromium"];
            }
            if (this._android) {
              this._dockerfile += dockerTemplates["android"];
              this._readme += readmeTemplates["android"];
            }
            if (this._vscode) {
              this._dockerfile += dockerTemplates["vscode"];
              this._readme += readmeTemplates["vscode"];
            }
            if (this._docker || this._k8s) {
              this._dockerfile += dockerTemplates["docker"].replace(
                "{DISTRO}",
                getDistro(this.base),
              );
              this._readme += readmeTemplates["docker"];
              if (this._k8s) {
                this._dockerfile += dockerTemplates["kubernetes"].replace(
                  "{DISTRO}",
                  getDistro(this.base),
                );
                this._readme += readmeTemplates["kubernetes"];
              }
            }
            if (this._zsh) {
              this._dockerfile += dockerTemplates["zsh"];
              this._readme += readmeTemplates["zsh"];
            }
            this._dockerfile += dockerTemplates["suffix"];
            this._readme += readmeTemplates["suffix"];
            this._dockerfile = this._dockerfile.replace(/FROM devimage\n/g, "");
            return [2, /*return*/ {
              Dockerfile: this._dockerfile,
              README: this._readme,
            }];
        }
      });
    });
  };
  return DevcontainerGenerator;
}());
exports.DevcontainerGenerator = DevcontainerGenerator;
