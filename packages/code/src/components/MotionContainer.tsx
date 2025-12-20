import { css } from "@emotion/react";
import { motion } from "framer-motion";

const rgba = (r: number, g: number, b: number, a: number) =>
  `rgba(${r || 1}, ${g || 1}, ${b || 1}, ${a || 0.7})`;

export const MotionContainer = (
  { children, bottom, right, bgColor, isChatOpen }: {
    children: React.ReactElement;
    bottom: number;
    right: number;
    bgColor: number[];
    isChatOpen: boolean;
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
        backgroundColor: rgba(
          bgColor[0] ?? 0,
          bgColor[1] ?? 0,
          bgColor[2] ?? 0,
          0.5,
        ),
        borderRadius: 16,
      }}
      style={{
        backgroundColor: rgba(
          bgColor[0] ?? 0,
          bgColor[1] ?? 0,
          bgColor[2] ?? 0,
          0.5,
        ),
      }}
      css={css`
      z-index: 1002;
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      position: fixed;
    `}
      drag
      dragMomentum={false}
      dragConstraints={{
        left: -window.innerWidth,
        right: window.innerWidth - 20 - window.innerWidth / 6,
        bottom: window.innerHeight,
      }}
      dragElastic={0.5}
    >
      {children}
    </motion.div>
  );
};
