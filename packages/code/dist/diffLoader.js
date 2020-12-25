"use strict";
const loader = async () => {
    const { diff } = await import("../diff/dist/diff.min.js");
    window.diff = diff;
};
loader();
