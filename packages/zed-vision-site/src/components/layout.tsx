/** @jsx jsx */
import { css, jsx } from "@emotion/react";

export const Layout = ({ children }) =>
  <main
    css={css`  
          max-width: 1140px;
          margin: auto;
       `}
  >
    {children}
  </main>;
