"use strict";
exports.__esModule = true;
var handler_ts_1 = require("./handler.ts");
var handleOptions_ts_1 = require("./utils/handleOptions.ts");
addEventListener("fetch", function (event) {
    if (event.request.method === "OPTIONS") {
        event.respondWith(handleOptions_ts_1.handleOptions(event.request));
    }
    else {
        event.respondWith(handler_ts_1.handleCloudRequest(event.request));
    }
});
