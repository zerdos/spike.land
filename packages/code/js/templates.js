"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getEditorHTML = exports.getHtml = exports.getCss = void 0;
var importmap_json_1 = require("../importmap.json");
function getCss(_a) {
    var _b;
    var html = _a.html;
    var bodyClass = String((_b = window.document.getElementById("zbody")) === null || _b === void 0 ? void 0 : _b.getAttribute("class"));
    var css = "";
    var cssRules = window.document.querySelector("head > style[data-emotion=css]");
    if (cssRules) {
        try {
            var sheet = window.document.querySelector("head > style[data-emotion=css]").sheet;
            if (sheet) {
                css = Array.from(
                // deno-lint-ignore ban-ts-comment
                // @ts-ignore
                sheet.cssRules).map(function (x) { return x.cssText; }).filter(function (cssRule) {
                    var selector = cssRule.substring(5, 10);
                    var isSelectorBody = bodyClass.indexOf(selector) !== -1;
                    var isInGeneratedHtml = html.indexOf(selector) !== -1;
                    var shouldInclude = isSelectorBody || isInGeneratedHtml;
                    return shouldInclude;
                }).join("\n  ").replace("#zbody", "body");
            }
        }
        catch (e) {
            console.error({ e: e });
        }
    }
    var globalCssRules = window.document.querySelector("head > style[data-emotion=css-global]");
    if (globalCssRules) {
        try {
            var sheet = window.document.querySelector("head > style[data-emotion=css-global]").sheet;
            if (sheet) {
                css += Array.from(sheet
                    .cssRules).map(function (x) { return x.cssText; })
                    .join("\n  ").replace("#zbody", "body");
            }
        }
        catch (e) {
            console.error({ e: e });
        }
    }
    return css;
}
exports.getCss = getCss;
function getHtml(_a) {
    //
    // For some reason, pre-rendering doesn't care about global styles, the site flickers without this patch
    //
    // let bodyStylesFix = "";
    var html = _a.html, css = _a.css;
    // const start = js.indexOf("body{");
    // if (start !== -1) {
    //   const firstBit = js.slice(start);
    //   const last = firstBit.indexOf("}");
    //   bodyStylesFix = firstBit.slice(0, last + 1);
    // }
    // const imports = globalThis.importMap;
    var titleStart = html.indexOf("<title>");
    var titleEnd = html.indexOf("</title>");
    var hasTitle = titleStart < titleEnd && titleStart >= -1;
    var title = hasTitle
        ? html.slice(titleStart, titleEnd)
        : "(code).spike.land :)";
    return "<!DOCTYPE html>\n<html lang=\"en\"> \n<head profile=\"http://www.w3.org/2005/10/profile\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<meta name=\"Description\" content=\"Generated with spike.land\">\n<title>".concat(title, "</title>\n<link rel=\"icon\" type=\"image/png\" href=\"https://code.spike.land/assets/zed-icon-big.png\" />\n<link rel=\"stylesheet\" href=\"https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css\" />\n\n<script async src=\"https://ga.jspm.io/npm:es-module-shims@1.4.1/dist/es-module-shims.js\"></script>\n<script type=\"esms-options\">\n{\n  \"shimMode\": true,\n  \"polyfillEnable\": [\"css-modules\", \"json-modules\"],\n  \"nonce\": \"n0nce\"\n}\n</script>\n<style>\n.skip-link {\n  position: absolute;\n  top: -40px;\n  left: 0;\n  background: #000000;\n  color: white;\n  padding: 8px;\n  z-index: 100;\n}\n.skip-link:focus {\n  top: 0;\n}\n").concat(css, "</style>\n</head>\n<body>\n<a class=\"skip-link\" href=\"#zbody\">Jump to the page</a>\n<main id=\"zbody\">\n  ").concat(html, "\n</main>\n<script>window.process = {env: {NODE_ENV:\"production\" }}</script>\n<script type=\"importmap-shim\">\n").concat(JSON.stringify({ imports: __assign(__assign({}, importmap_json_1["default"].imports), { "app": "./app.js" }) }), "\n</script>\n<script type=\"module-shim\">\n  import App from 'app';\n  import {jsx} from \"@emotion/react\"\n  import ReactDOM from \"react-dom\"\n\n  ReactDOM.render(jsx(App),document.getElementById('zbody'));\n</script>\n</body>\n</html>\n");
}
exports.getHtml = getHtml;
/**
 * @param {string}} cid
 * @returns {string}
 */
var getEditorHTML = function () {
    return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n  <link rel=\"icon\" type=\"image/png\" href=\"https://code.spike.land/assets/zed-icon-big.png\" />\n  \n  <script crossorigin src=\"https://unpkg.com/react@17.0.2/umd/react.production.min.js\"></script>\n  <script crossorigin src=\"https://unpkg.com/react-is@17.0.2/umd/react-is.production.min.js\"></script>\n  <script crossorigin src=\"https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js\"></script>\n  <script async src=\"https://ga.jspm.io/npm:es-module-shims@1.4.1/dist/es-module-shims.js\"></script>\n<title>Instant React Editor</title>\n</head>\n<body>\n<script>window.process = {env: {NODE_ENV:\"production\" }}</script>\n<script type=\"importmap\">\n".concat(JSON.stringify({
        imports: __assign(__assign({}, importmap_json_1["default"].imports), { "app": ["./app.js"] })
    }), "\n</script>\n<script type=\"module\">\nimport {edit} from \"https://code.spike.land/js/data.mjs\"\ntry{\n  edit(location.pathname.slice(42, 52));\n}catch(error){\n  fetch(\"https://code.spike.land/error\", {method: \"POST\",  body: JSON.stringify({error})})\n}\n</script>\n</body>\n</html>");
};
exports.getEditorHTML = getEditorHTML;
