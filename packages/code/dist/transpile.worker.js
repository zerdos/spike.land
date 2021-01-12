"use strict";
// deno-lint-ignore-file
// @ts-ignore
self.importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.js");
// @ts-ignore
self.importScripts("https://unpkg.com/@babel/standalone@7.12.12/babel.min.js");
// @ts-ignore
addEventListener("install", () => skipWaiting());
// @ts-ignore
addEventListener("activate", () => clients.claim());
const searchRegExp2 = /import.*from '/gi;
const replace2 = "$&https://cdn.skypack.dev/";
// const from = / from '/gi;
// const replaceWith = `const { $1 } = await import('$2');`;
const searchRegExp = /import.*react';/gi;
const searchRegExpMotion = /import.*framer-motion';/gi;
// const searchRegExp = /import /gi;
// const from = / from '/gi;
const replaceWith = "";
//
/**
 * @param {string} code
 *  @param {boolean} hasToReport
 */
const transform = (code, hasToReport) => {
    try {
        const safeCode = code.replaceAll(searchRegExp, replaceWith).replaceAll(searchRegExpMotion, replaceWith).replaceAll(searchRegExp2, replace2);
        // console.log(safeCode);
        // @ts-ignore
        const transformed = Babel.transform(`/** @jsx jsx */
      import {jsx, React, css, Fragment, Global, Motion, motion} from "https://unpkg.com/@zedvision/emotion-react-renderer@11.6.16/dist/bundle.js";
      
      ` + safeCode + `
      
      const {useState, useRef, useEffect} = React

      `, {
            compact: false,
            comments: false,
            plugins: [],
            presets: [
                "react",
                "es2017",
                ["typescript", { isTSX: true, allExtensions: true }],
            ],
        }).code;
        // console.log(transformed);
        return transformed;
    }
    catch (e) {
        hasToReport && console.error(e);
        return "";
    }
};
// @ts-ignore
self.addEventListener("connect", 
// @ts-ignore
({ ports }) => Comlink.expose(transform, ports[0]));
// @ts-ignore
self.addEventListener("message", (event) => {
    if (event.data.comlinkInit) {
        //@ts
        // @ts-ignore
        Comlink.expose(transform, event.data.port);
        return;
    }
});
