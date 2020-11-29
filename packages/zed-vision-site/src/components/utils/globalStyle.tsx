import * as React from "react";
import typography from "./typography.ts";
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
      styles={{
        body: {
          margin: 0,
          padding: 0,
        },
      }}
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
