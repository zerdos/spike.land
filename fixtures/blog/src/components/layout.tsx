/** @jsx jsx */
import { css, jsx } from "@emotion/react";

export const Layout: React.FC = ({ children }) => (
  <main
    css={css`  
          max-width: 1140px;
          margin: auto;
          img{
            max-width: 100%;
          }
       `}
  >
    {children}
  </main>
);
