import { css } from "@emotion/react";
import { motion } from "framer-motion";

export const MotionContainer = (
  { children, bottom, right, bgColor, rgba, isChatOpen }: {
    children: JSX.Element;
    bottom: number;
    right: number;
    bgColor: number[];
    isChatOpen: boolean;
    rgba: (r: number, g: number, b: number, a: number) => string;
  },
) => {
  return (
    <motion.div
      layout
      initial={{ padding: 0, top: 0, right: 0, borderRadius: 0 }}
      animate={{
        padding: 8,
        top: bottom,
        right: isChatOpen ? window.innerWidth / 2 : 0 + right,
        backgroundColor: rgba(bgColor[0], bgColor[1], bgColor[2], 0.5),
        borderRadius: 16,
      }}
      style={{ backgroundColor: rgba(bgColor[0], bgColor[1], bgColor[2], 0.5) }}
      css={css`
      z-index: 10;
      backdrop-filter: blur(15px);
      position: fixed;
    `}
      drag
      dragMomentum={false}
      dragConstraints={{
        left: -innerWidth,
        right: innerWidth - 20 - innerWidth / 6,
        bottom: innerHeight,
      }}
      dragElastic={0.5}
    >
      {children}
    </motion.div>
  );
};
