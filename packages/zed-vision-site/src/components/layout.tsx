import * as React from "react";
import typography from "./utils/typography";
import { fonts } from "./utils/fonts";
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const styles = typography.createStyles().replace(
  /first-child/gi,
  "first-of-type",
);

export const Layout: React.FC = ({ children }) =>
  <React.Fragment>
    <main
      css={css`

  max-width: 1140px;
  margin: auto;

  ${fonts}

${styles}

      
      `}
    >
      {children}
    </main>
  </React.Fragment>;
