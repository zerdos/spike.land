import * as React from "react";
import typography from "./typography.ts";
import {normalize} from "./normalize-css.tsx";
import { fonts } from "./fonts.ts";
/** @jsx jsx */
import { css, Global, jsx } from "@emotion/react";

const styles = typography.createStyles().replace(
  /first-child/gi,
  "first-of-type",
);

export const GlobalStyle: React.FC = () =>
  <React.Fragment>
    <Global
      styles={css`
      ${normalize}
      `}
    />
  </React.Fragment>;

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
