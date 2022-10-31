// src/index.tsx
import { render } from "https://ga.jspm.io/npm:react-dom@17.0.2/dev.index.js";

// src/rca.tsx
import { css } from "https://ga.jspm.io/npm:@emotion/react@11.10.0/dist/emotion-react.browser.esm.js";
import {
  jsx,
  jsxs,
} from "https://ga.jspm.io/npm:@emotion/react@11.10.0/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js";
import { motion } from "https://ga.jspm.io/npm:framer-motion@6.5.1/dist/es/index.mjs";
var RCA = () =>
  /* @__PURE__ */ jsxs("header", {
    css: css`
      background-color: red;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: calc(10px + 2vmin);
      color: white;
      text-align: center;
      overflow: hidden;
    `,
    children: [
      /* @__PURE__ */ jsxs(motion.div, {
        animate: { rotate: 360 },
        transition: {
          repeat: 0,
          duration: 2,
          repeatType: "loop",
        },
        children: [
          /* @__PURE__ */ jsx("div", {
            css: css`
          font-size: calc(10px + 20vmin);
        `,
            children: "\u{1F525}",
          }),
          "---d--.dd------",
        ],
      }),
      /* @__PURE__ */ jsxs("p", {
        children: [
          "Hey! ",
          /* @__PURE__ */ jsx("br", {}),
          " Try to do some msdodify ",
          /* @__PURE__ */ jsx("code", {
            children: "this",
          }),
          " page.",
        ],
      }),
      /* @__PURE__ */ jsx("a", {
        css: css`
        color: #61dafb;
      `,
        href: "./",
        children: "Open the editor or wait for notuhing it to open.",
      }),
    ],
  });

// src/index.tsx
import { jsx as jsx2 } from "https://ga.jspm.io/npm:@emotion/react@11.10.0/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js";
var target = document.getElementById("root");
target?.style.setProperty("height", "100%");
render(/* @__PURE__ */ jsx2(RCA, {}), target);
