import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
export default () => (_jsxs("header", { css: css `
      background-color: #282c34;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: calc(10px + 2vmin);
      color: white;
      text-align: center;
      overflow: hidden;
    `, children: [_jsxs(motion.div, { animate: { rotate: 360 }, transition: {
                repeat: 0,
                duration: 2,
                repeatType: "loop",
            }, children: [_jsx("div", { css: css `
      font-size: calc(10px + 20vmin);
        `, children: "\uD83D\uDD25" }), "-------------------"] }), _jsxs("p", { children: ["Hey!Try to modify ", _jsx("code", { children: "this" }), " page."] }), _jsx("a", { css: css `
  color: #61dafb;
  `, href: "./edit", children: "Open the editor." })] }));
