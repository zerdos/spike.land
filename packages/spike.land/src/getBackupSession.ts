import type { ICodeSession } from "../../code/src/makeSess";

export function getBackupSession() {
  return {
    "i": 3734,
    "transpiled":
      "import { jsx as jsX } from \"@emotion/react\";\nimport { css } from \"@emotion/react\";\nimport { motion } from \"framer-motion\";\nexport default () => /* @__PURE__ */ jsX(\"header\", {\n  css: css`\n      background-color: gre;\n      min-height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      font-size: calc(10px + 2vmin);\n      color: white;\n      text-align: center;\n      overflow: hidden;\n    `\n}, /* @__PURE__ */ jsX(motion.div, {\n  animate: { rotate: 360 },\n  transition: {\n    repeat: 0,\n    duration: 2,\n    repeatType: \"loop\"\n  }\n}, /* @__PURE__ */ jsX(\"div\", {\n  css: css`\n          font-size: calc(10px + 20vmin);\n        `\n}, \"\\u{1F525}\"), \"-------------------\"), /* @__PURE__ */ jsX(\"p\", null, \"Hey!Try to modify \", /* @__PURE__ */ jsX(\"code\", null, \"this\"), \" page.\"), /* @__PURE__ */ jsX(\"a\", {\n  css: css`\n        color: #61dafb;\n      `,\n  href: \"./edit\"\n}, \"Open the editor.\"));\n",
    "code":
      "import { css } from '@emotion/react';\nimport { motion } from 'framer-motion';\n\nexport default () => (\n  <header\n    css={css`\n      background-color: gre;\n      min-height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      font-size: calc(10px + 2vmin);\n      color: white;\n      text-align: center;\n      overflow: hidden;\n    `}>\n    <motion.div\n      animate={{ rotate: 360 }}\n      transition={{\n        repeat: 0,\n        duration: 2,\n        repeatType: 'loop',\n      }}>\n      <div\n        css={css`\n          font-size: calc(10px + 20vmin);\n        `}>\n        🔥\n      </div>\n      -------------------\n    </motion.div>\n    <p>\n      Hey!Try to modify <code>this</code> page.\n    </p>\n    <a\n      css={css`\n        color: #61dafb;\n      `}\n      href=\"./edit\">\n      Open the editor.\n    </a>\n  </header>\n);\n",
    "html":
      "<header class=\"css-34wkbp\">\n  <div data-projection-id=\"3\">\n    <div class=\"css-15plvkc\">🔥</div>\n    -------------------\n  </div>\n  <p>Hey!Try to modify <code>this</code> page.</p>\n  <a href=\"./edit\" class=\"css-1v5q1ar\">Open the editor.</a>\n</header>\n",
    "css":
      ".css-34wkbp {\n  background-color: gre;\n  min-height: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n  text-align: center;\n  overflow: hidden;\n}\n.css-15plvkc {\n  font-size: calc(10px + 20vmin);\n}\n.css-1v5q1ar {\n  color: #61dafb;\n}\n",
  } as ICodeSession;
}
