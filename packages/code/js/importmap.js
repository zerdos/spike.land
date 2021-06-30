const imports = {
  "@babel/runtime/helpers/": "https://unpkg.com/@babel/runtime@7.14.0/helpers/",
  "@babel/runtime/helpers/extends":
    "https://unpkg.com/@babel/runtime@7.14.0/helpers/esm/extends.js",
  "@emotion/cache":
    "https://unpkg.com/@emotion/cache@11.4.0/dist/emotion-cache.browser.esm.js",
  "@emotion/hash":
    "https://unpkg.com/@emotion/hash@0.8.0/dist/hash.browser.esm.js",
  "@emotion/is-prop-valid":
    "https://unpkg.com/@emotion/is-prop-valid@1.1.0/dist/emotion-is-prop-valid.browser.esm.js",
  "@emotion/memoize":
    "https://unpkg.com/@emotion/memoize@0.7.5/dist/emotion-memoize.browser.esm.js",
  "@emotion/react":
    "https://unpkg.com/@emotion/react@11.4.0/dist/emotion-react.browser.esm.js",
  "@emotion/serialize":
    "https://unpkg.com/@emotion/serialize@1.0.2/dist/emotion-serialize.browser.esm.js",
  "@emotion/sheet":
    "https://unpkg.com/@emotion/sheet@1.0.1/dist/emotion-sheet.browser.esm.js",
  "@emotion/styled":
    "https://unpkg.com/@emotion/styled@11.3.0/dist/emotion-styled.browser.esm.js",
  "@emotion/unitless":
    "https://unpkg.com/@emotion/unitless@0.7.5/dist/unitless.browser.esm.js",
  "@emotion/utils":
    "https://unpkg.com/@emotion/utils@1.0.0/dist/emotion-utils.browser.esm.js",
  "@emotion/weak-memoize":
    "https://unpkg.com/@emotion/weak-memoize@0.2.5/dist/weak-memoize.browser.esm.js",
  "@material-ui/core":
    "https://unpkg.com/@material-ui/core@5.0.0-alpha.38/modern/index.js",
  "@material-ui/core/":
    "https://unpkg.com/@material-ui/core@5.0.0-alpha.38/modern/",
  "@material-ui/core/utils":
    "https://unpkg.com/@material-ui/core@5.0.0-alpha.38/modern/utils/index.js",
  "@material-ui/core/utils/":
    "https://unpkg.com/@material-ui/core@5.0.0-alpha.38/modern/utils/",
  "@material-ui/private-theming":
    "https://unpkg.com/@material-ui/private-theming@5.0.0-alpha.36/modern/index.js",
  "@material-ui/private-theming/":
    "https://unpkg.com/@material-ui/private-theming@5.0.0-alpha.36/modern/",
  "@material-ui/styled-engine":
    "https://unpkg.com/@material-ui/styled-engine@5.0.0-alpha.34/modern/index.js",
  "@material-ui/styled-engine/":
    "https://unpkg.com/@material-ui/styled-engine@5.0.0-alpha.34/modern/",
  "@material-ui/system":
    "https://unpkg.com/@material-ui/system@5.0.0-alpha.38/modern/index.js",
  "@material-ui/unstyled":
    "https://unpkg.com/@material-ui/unstyled@5.0.0-alpha.38/modern/index.js",
  "@material-ui/unstyled/":
    "https://unpkg.com/@material-ui/unstyled@5.0.0-alpha.38/modern/",
  "@material-ui/utils":
    "https://unpkg.com/@material-ui/utils@5.0.0-alpha.36/modern/index.js",
  "@popperjs/core": "https://unpkg.com/@popperjs/core@2.9.2/dist/esm/index.js",
  "@types/react": "https://unpkg.com/@types/react@17.0.11/index.d.ts",
  "global.d.ts": "https://unpkg.com/@types/react@17.0.11/global.d.ts",
  "scheduler/": "https://esm.sh/scheduler/",
  "csstype": "https://unpkg.com/csstype@3.0.8/index.d.ts",
  "clsx": "https://unpkg.com/clsx@1.1.1/dist/clsx.m.js",
  "css-vendor": "https://unpkg.com/css-vendor@2.0.8/dist/css-vendor.esm.js",
  "dom-helpers/": "https://unpkg.com/dom-helpers@5.2.1/esm/",
  "framer-motion": "https://unpkg.com/framer-motion@4.1.17/dist/es/index.js",
  "framesync": "https://unpkg.com/framesync@5.3.0/dist/es/index.js",
  "hey-listen":
    "https://unpkg.com/@zedvision/hey-listen@1.1.2/dist/hey-listen.es.js",
  "hoist-non-react-statics": "https://esm.sh/hoist-non-react-statics",
  "hyphenate-style-name":
    "https://unpkg.com/hyphenate-style-name@1.0.4/index.js",
  "is-in-browser": "https://unpkg.com/is-in-browser@2.0.0/dist/index.mjs",
  "jss": "https://unpkg.com/jss@10.6.0/dist/jss.esm.js",
  "jss-plugin-camel-case":
    "https://unpkg.com/jss-plugin-camel-case@10.6.0/dist/jss-plugin-camel-case.esm.js",
  "jss-plugin-default-unit":
    "https://unpkg.com/jss-plugin-default-unit@10.6.0/dist/jss-plugin-default-unit.esm.js",
  "jss-plugin-global":
    "https://unpkg.com/jss-plugin-global@10.6.0/dist/jss-plugin-global.esm.js",
  "jss-plugin-nested":
    "https://unpkg.com/jss-plugin-nested@10.6.0/dist/jss-plugin-nested.esm.js",
  "jss-plugin-props-sort":
    "https://unpkg.com/jss-plugin-props-sort@10.6.0/dist/jss-plugin-props-sort.esm.js",
  "jss-plugin-rule-value-function":
    "https://unpkg.com/jss-plugin-rule-value-function@10.6.0/dist/jss-plugin-rule-value-function.esm.js",
  "jss-plugin-vendor-prefixer":
    "https://unpkg.com/jss-plugin-vendor-prefixer@10.6.0/dist/jss-plugin-vendor-prefixer.esm.js",
  "monaco-editor":
    "https://unpkg.com/monaco-editor@0.25.2/esm/vs/editor/editor.main.js",
  "popmotion": "https://unpkg.com/popmotion@9.4.0/dist/es/index.js",
  "prop-types": "https://esm.sh/prop-types",
  "react": "https://unpkg.com/@zedvision/esm@14.3.1/dist/react.mjs",
  "react-dom": "https://unpkg.com/@zedvision/esm@14.3.1/dist/react-dom.mjs",
  "react-is": "https://unpkg.com/@zedvision/esm@14.3.1/dist/react-is.mjs",
  "react-transition-group":
    "https://unpkg.com/react-transition-group@4.4.2/esm/index.js",
  "react/": "https://esm.sh/react/",
  "renderer": "https://blog.spike.land/packages/code/modules/renderer.mjs",
  "style-value-types":
    "https://unpkg.com/style-value-types@4.1.4/dist/es/index.js",
  "stylis": "https://unpkg.com/stylis@4.0.10/dist/stylis.mjs",
  "@zedvision/qrious":
    "https://unpkg.com/@zedvision/qrious@14.1.0/dist/QRious.mjs",
  "tiny-warning":
    "https://unpkg.com/tiny-warning@1.0.3/dist/tiny-warning.esm.js",
  "tslib": "https://unpkg.com/tslib@2.3.0/tslib.es6.js",
};

globalThis.importMap = imports;

document.head.appendChild(Object.assign(document.createElement("script"), {
  src: "https://unpkg.com/es-module-shims@0.11.1/dist/es-module-shims.js",
  async: true,
}));

document.head.appendChild(Object.assign(document.createElement("script"), {
  type: "importmap",
  innerHTML: JSON.stringify({ imports }),
}));

window.process = { env: { NODE_ENV: "production" } };
