"use strict";
var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) {
        if (Object.hasOwnProperty.call(s, p)) {
          t[p] = s[p];
        }
      }
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.handleOptions = exports.js = exports.text = exports.json = void 0;
var corsHeaders_ts_1 = require("./corsHeaders.ts");
function json(resp) {
  return new Response(JSON.stringify(resp), {
    headers: __assign(
      __assign({}, corsHeaders_ts_1.corsHeaders),
      { "Content-Type": "application/json;charset=UTF-8" },
    ),
  });
}
exports.json = json;
function text(resp) {
  return new Response(resp, {
    headers: __assign(
      __assign({}, corsHeaders_ts_1.corsHeaders),
      { "Content-Type": "text/html;charset=UTF-8" },
    ),
  });
}
exports.text = text;
function js(resp) {
  return new Response(resp, {
    headers: __assign(
      __assign({}, corsHeaders_ts_1.corsHeaders),
      { "Content-Type": "application/javascript;charset=UTF-8" },
    ),
  });
}
exports.js = js;
function handleOptions(request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  var headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    var respHeaders = __assign(__assign({}, corsHeaders_ts_1.corsHeaders), {
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      "Access-Control-Allow-Headers": request.headers.get(
        "Access-Control-Request-Headers",
      ),
    });
    return new Response(null, {
      headers: respHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: corsHeaders_ts_1.corsHeaders["Access-Control-Allow-Methods"],
      },
    });
  }
}
exports.handleOptions = handleOptions;
