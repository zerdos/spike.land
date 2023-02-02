import { css } from "@emotion/react";
import { motion } from "framer-motion";

export const RCA = () => (
  <header
    css={css`
      background-color: red;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: calc(10px + 2vmin);
      color: white;
      text-align: center;
      overflow: hidden;
    `}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: 0,
        duration: 2,
        repeatType: "loop",
      }}
    >
      <div
        css={css`
          font-size: calc(10px + 20vmin);
        `}
      >
        🔥
      </div>
      -----------
    </motion.div>
    <p>
      Hey! <br /> Try to do some msdodify <code>this</code> page.
    </p>
    <a
      css={css`
        color: #61dafb;
      `}
      href="./"
    >
      Open the editor or wait for notuhing it to open.
    </a>
  </header>
);
