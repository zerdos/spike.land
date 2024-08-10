import { css } from "@emotion/react";
import { motion } from "framer-motion";

export const ScaledContent = (
  { children, innerHeight, width, scale, bgColor, rgba }: {
    children: JSX.Element;
    innerHeight: number;
    width: number;
    scale: number;
    bgColor: number[];
    rgba: (r: number, g: number, b: number, a: number) => string;
  },
) => (
  <motion.div
    transition={{ zoom: { type: "spring" }, delay: 0 }}
    css={css`
        transform-origin: top left;
        display: inline-block;
        border-radius: 8px;
        background-color: ${rgba(bgColor[0], bgColor[1], bgColor[2], 0.5)};
        overflow: hidden;
      `}
    initial={{
      height: innerHeight,
      width: innerWidth,
      scale: 1,
    }}
    animate={{ height: innerHeight, width, scale }}
  >
    {children}
  </motion.div>
);
