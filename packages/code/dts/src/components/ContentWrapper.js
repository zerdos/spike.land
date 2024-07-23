import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { motion } from "framer-motion";
import { css } from "../emotion";
export const ContentWrapper = (
  { children, scale, innerHeight, width, bgColor, rgba, type },
) => (_jsx(motion.div, {
  transition: { scale: { type } },
  css: css`
        display: block;
        border-radius: 8px;
        background-color: ${rgba(bgColor[0], bgColor[1], bgColor[2], 0.5)};
      `,
  initial: { height: innerHeight, width: innerWidth },
  animate: {
    height: innerHeight * scale,
    width: width * scale,
  },
  children: children,
}));
