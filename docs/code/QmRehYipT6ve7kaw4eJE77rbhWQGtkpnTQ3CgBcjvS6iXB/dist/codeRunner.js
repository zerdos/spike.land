"use strict";
(async (_w) => {
    const { run } = await import("./codeLoader.js");
    run("window", _w);
})(window);
