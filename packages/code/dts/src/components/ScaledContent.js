import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { css } from "../emotion";
import { motion } from "../motion";
export const ScaledContent = ({ children, innerHeight, width, scale, bgColor, rgba }) => (_jsx(motion.div, { transition: { zoom: { type: "spring" }, delay: 0 }, css: css `
        transform-origin: top left;
        display: inline-block;
        border-radius: 8px;
        background-color: ${rgba(bgColor[0], bgColor[1], bgColor[2], 0.5)};
        overflow: hidden;
      `, initial: {
        height: innerHeight,
        width: innerWidth,
        scale: 1,
    }, animate: { height: innerHeight, width, scale }, children: children }));
