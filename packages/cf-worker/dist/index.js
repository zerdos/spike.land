"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_ts_1 = require("./handler.ts");
addEventListener("fetch", (event) => {
    event.respondWith(handler_ts_1.handleCloudRequest(event.request));
});
//# sourceMappingURL=index.js.map