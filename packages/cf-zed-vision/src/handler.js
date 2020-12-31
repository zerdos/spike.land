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
exports.handleCloudRequest = exports.log = void 0;
var sha256_js_1 = require("../../code/src/sha256.js");
var getDbObj_ts_1 = require("../../shadb/src/getDbObj.ts");
var admin_ts_1 = require("./admin.ts");
var handleOptions_ts_1 = require("./utils/handleOptions.ts");
var dec_ts_1 = require("./dec.ts");
var SHAKV;
var USERS;
var LOGS;
var USERKEYS;
var API_KEY;
var now = 0;
function log(message, data) {
  if (data === void 0) data = {};
  now = now || Date.now();
  var _a = new Date().toLocaleTimeString("en-US").split(/:| /),
    hour = _a[0],
    minute = _a[1];
  return LOGS.put(
    String(2000000000000 - now++),
    JSON.stringify({ message: message, time: hour + ":" + minute, data: data }),
    { expirationTtl: 86400 * 7 },
  );
}
exports.log = log;
function handleCloudRequest(request) {
  return __awaiter(this, void 0, void 0, function () {
    var _a,
      country,
      colo,
      url,
      searchParams,
      pathname,
      psk,
      key,
      tokenKey,
      userIdKey,
      pass,
      tokenPassUserId,
      checkTokenPassUserId,
      uuid,
      tokenUuid,
      checkPass,
      checkPassToken,
      key_1,
      waitForChange,
      data,
      uuid,
      uuidHash,
      uuid,
      uuidHash,
      uuidHash,
      uuid,
      maybeRoute,
      shaDB,
      result,
      zkey,
      sha,
      uKey,
      gKey,
      proofKey,
      checkGkey,
      myBuffer,
      hash,
      smallerKey,
      uuid,
      checkProofKey,
      maybeRoute,
      shaDB,
      result;
    var _this = this;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _a = request.cf || { country: "", colo: "" },
            country = _a.country,
            colo = _a.colo;
          url = new URL(request.url);
          searchParams = url.searchParams, pathname = url.pathname;
          psk = String(request.headers.get("API_KEY") || "");
          log(
            "request",
            {
              searchParams: searchParams,
              pathname: pathname,
              country: country,
              colo: colo,
            },
          );
          if (!(request.method === "GET" && psk && psk == API_KEY)) {
            return [3, /*break*/ 1];
          }
          return [
            2, /*return*/
            admin_ts_1.handleAdmin(request, searchParams, pathname, SHAKV),
          ];
        case 1:
          if (!(request.method === "GET")) return [3, /*break*/ 26];
          if (pathname === "/robots.txt") {
            return [
              2, /*return*/
              handleOptions_ts_1.text("User-agent: * Disallow: /"),
            ];
          }
          if (!(pathname === "/connect")) return [3, /*break*/ 10];
          if (!searchParams.get("key")) return [3, /*break*/ 10];
          key = searchParams.get("key");
          tokenKey = key.slice(0, 8);
          userIdKey = key.slice(8, 16);
          pass = key.slice(16, 24);
          tokenPassUserId = key.slice(24, 32);
          return [4, /*yield*/ sha256_js_1.sha256(tokenKey + userIdKey)];
        case 2:
          checkTokenPassUserId = _b.sent();
          if (
            !tokenKey || !userIdKey || !pass ||
            (checkTokenPassUserId !== tokenPassUserId)
          ) {
            return [
              2, /*return*/
              handleOptions_ts_1.json({ error: "auth error" }),
            ];
          }
          return [4, /*yield*/ USERKEYS.get(userIdKey)];
        case 3:
          uuid = _b.sent();
          if (uuid === null) {
            return [2, /*return*/ handleOptions_ts_1.json({ error: 401 })];
          }
          return [4, /*yield*/ USERKEYS.get(tokenKey)];
        case 4:
          tokenUuid = _b.sent();
          if (tokenUuid === null) {
            return [
              2, /*return*/
              handleOptions_ts_1.json({
                error: 404,
                message: "token not found",
              }),
            ];
          }
          return [4, /*yield*/ sha256_js_1.sha256(tokenKey + uuid)];
        case 5:
          checkPass = _b.sent();
          return [4, /*yield*/ sha256_js_1.sha256(tokenUuid + uuid)];
        case 6:
          checkPassToken = _b.sent();
          if (!(checkPass === pass)) return [3, /*break*/ 8];
          return [
            4, /*yield*/
            USERS.put(
              tokenUuid,
              JSON.stringify({
                uuid: uuid,
                connected: userIdKey,
              }),
              { expirationTtl: 60 },
            ),
          ];
        case 7:
          _b.sent();
          return [2, /*return*/ handleOptions_ts_1.json({ success: true })];
        case 8:
          if (checkPassToken === pass) {
            return [2, /*return*/ handleOptions_ts_1.json({ success: true })];
          }
          _b.label = 9;
        case 9:
          return [2, /*return*/ handleOptions_ts_1.json({ error: 401 })];
        case 10:
          if (!(pathname === "/check")) return [3, /*break*/ 12];
          key_1 = searchParams.get("key");
          if (key_1 === null) {
            return [2, /*return*/ new Response("500")];
          }
          waitForChange = function () {
            return __awaiter(_this, void 0, void 0, function () {
              var uuid, data;
              var _this = this;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4, /*yield*/ USERKEYS.get(key_1)];
                  case 1:
                    uuid = _a.sent();
                    if (!uuid) {
                      return [2, /*return*/ null];
                    }
                    return [4, /*yield*/ USERS.get(uuid, "json")];
                  case 2:
                    data = _a.sent();
                    if (!data || data.connected) {
                      return [2, /*return*/ data];
                    }
                    return [
                      2, /*return*/
                      new Promise(function (resolve) {
                        var clear = setInterval(function () {
                          return __awaiter(_this, void 0, void 0, function () {
                            var data;
                            return __generator(this, function (_a) {
                              switch (_a.label) {
                                case 0:
                                  return [4, /*yield*/ USERS.get(uuid, "json")];
                                case 1:
                                  data = _a.sent();
                                  if (!data || data.connected) {
                                    clearInterval(clear);
                                    resolve(data);
                                  }
                                  return [2 /*return*/];
                              }
                            });
                          });
                        }, 1000);
                      }),
                    ];
                }
              });
            });
          };
          return [4, /*yield*/ waitForChange()];
        case 11:
          data = _b.sent();
          return [
            2, /*return*/
            handleOptions_ts_1.json({ expired: data === null }),
          ];
        case 12:
          if (!(pathname === "/register")) return [3, /*break*/ 17];
          uuid = dec_ts_1.v4();
          return [4, /*yield*/ sha256_js_1.sha256(uuid)];
        case 13:
          uuidHash = _b.sent();
          return [
            4, /*yield*/
            USERS.put(
              uuid,
              JSON.stringify(
                {
                  uuid: uuid,
                  uuidHash: uuidHash,
                  registered: Date.now(),
                  country: country,
                  colo: colo,
                },
              ),
            ),
          ];
        case 14:
          _b.sent();
          return [4, /*yield*/ log("register", { uuidHash: uuidHash })];
        case 15:
          _b.sent();
          return [4, /*yield*/ USERKEYS.put(uuidHash, uuid)];
        case 16:
          _b.sent();
          return [2, /*return*/ handleOptions_ts_1.json({ uuid: uuid })];
        case 17:
          if (!(pathname === "/token")) return [3, /*break*/ 21];
          uuid = dec_ts_1.v4();
          return [4, /*yield*/ sha256_js_1.sha256(uuid)];
        case 18:
          uuidHash = _b.sent();
          return [
            4, /*yield*/
            USERS.put(
              uuid,
              JSON.stringify(
                {
                  uuid: uuid,
                  registered: Date.now(),
                  country: country,
                  colo: colo,
                },
              ),
              { expirationTtl: 60 },
            ),
          ];
        case 19:
          _b.sent();
          return [
            4, /*yield*/
            USERKEYS.put(uuidHash, uuid, { expirationTtl: 60 }),
          ];
        case 20:
          _b.sent();
          return [
            2, /*return*/
            handleOptions_ts_1.json({ uuid: uuid, key: uuidHash }),
          ];
        case 21:
          if (!(pathname === "/create-project")) return [3, /*break*/ 23];
          uuidHash = request.headers.get("TOKEN");
          uuid = dec_ts_1.v4();
          return [
            4, /*yield*/
            USERS.put(
              uuid,
              JSON.stringify(
                {
                  uuid: uuid,
                  registered: Date.now(),
                  country: country,
                  colo: colo,
                },
              ),
            ),
          ];
        case 22:
          _b.sent();
          return [2, /*return*/ handleOptions_ts_1.json({ uuid: uuid })];
        case 23:
          maybeRoute = pathname.substr(1);
          if (!maybeRoute) return [3, /*break*/ 25];
          shaDB = getDbObj_ts_1.getDbObj(SHAKV);
          return [4, /*yield*/ shaDB.get(maybeRoute)];
        case 24:
          result = (_b.sent());
          if (result !== null) {
            if (result.indexOf("export") === 0) {
              return [2, /*return*/ handleOptions_ts_1.js(result)];
            }
            return [2, /*return*/ handleOptions_ts_1.text(result)];
          }
          _b.label = 25;
        case 25:
          return [
            2, /*return*/
            Response.redirect("https://code.zed.vision", 301),
          ];
        case 26:
          if (!(request.method === "POST")) return [3, /*break*/ 36];
          zkey = String(request.headers.get("ZKEY") || "");
          sha = zkey.slice(0, 8);
          uKey = zkey.slice(8, 16);
          gKey = zkey.slice(16, 24);
          proofKey = zkey.slice(24, 32);
          if (!sha || !uKey || !gKey || !proofKey) {
            return [
              2, /*return*/
              handleOptions_ts_1.json(
                { error: 401, "message": "not matching keys" },
              ),
            ];
          }
          return [4, /*yield*/ sha256_js_1.sha256(sha + uKey)];
        case 27:
          checkGkey = _b.sent();
          if (checkGkey !== gKey) {
            return [
              2, /*return*/
              handleOptions_ts_1.json(
                {
                  error: 401,
                  "message": "content and userkeys are not a pain",
                },
              ),
            ];
          }
          return [4, /*yield*/ request.arrayBuffer()];
        case 28:
          myBuffer = _b.sent();
          return [4, /*yield*/ sha256_js_1.sha256(myBuffer)];
        case 29:
          hash = _b.sent();
          smallerKey = hash.substring(0, 8);
          if (smallerKey !== sha) {
            return [
              2, /*return*/
              handleOptions_ts_1.json({
                error: 401,
                message: "body hash not matching with the sent hash: " +
                  smallerKey + " -- " + zkey,
              }),
            ];
          }
          return [4, /*yield*/ USERKEYS.get(uKey)];
        case 30:
          uuid = _b.sent();
          if (!uuid) {
            return [
              2, /*return*/
              handleOptions_ts_1.json(
                { error: 500, message: "user not found" },
              ),
            ];
          }
          return [4, /*yield*/ sha256_js_1.sha256(sha + uuid)];
        case 31:
          checkProofKey = _b.sent();
          if (checkProofKey !== proofKey) {
            return [
              2, /*return*/
              handleOptions_ts_1.json(
                { error: 401, message: "user not verified" },
              ),
            ];
          }
          return [4, /*yield*/ log("new html", { sha: sha, uKey: uKey })];
        case 32:
          _b.sent();
          maybeRoute = pathname.substr(1);
          return [4, /*yield*/ SHAKV.put(smallerKey, myBuffer)];
        case 33:
          _b.sent();
          if (!maybeRoute) return [3, /*break*/ 35];
          shaDB = getDbObj_ts_1.getDbObj(SHAKV);
          return [4, /*yield*/ shaDB.put(maybeRoute, smallerKey)];
        case 34:
          result = _b.sent();
          _b.label = 35;
        case 35:
          return [
            2, /*return*/
            handleOptions_ts_1.json({
              hash: smallerKey,
            }),
          ];
        case 36:
          return [2, /*return*/ new Response("404")];
      }
    });
  });
}
exports.handleCloudRequest = handleCloudRequest;
