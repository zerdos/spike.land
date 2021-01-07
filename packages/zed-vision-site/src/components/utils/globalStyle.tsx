import typography from "./typography";
import { fonts } from "./fonts";

/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import React from "react";

const styles = typography.createStyles().replace(
  /first-child/gi,
  "first-of-type",
);

export const MainContainer: React.FC = ({ children }) =>
  <div
    css={css`
      ${fonts}
      ${styles}
  `}
  >
    <main
      css={css`  
  max-width: 1140px;
  margin: auto;
  `}
    >
      {children}
    </main>
  </div>;
