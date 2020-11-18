import * as React from "react";
import typography from "./typography";
import { fonts } from "./fonts";
/** @jsx jsx */
import { css, Global, jsx } from "@emotion/react";

const styles = typography.createStyles().replace(
  /first-child/gi,
  "first-of-type",
);

export const GlobalStyle = () =>
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

export const MainContainer = ({ children }) =>
  <div
    css={`
      ${fonts}
      ${styles}
  `}
  >
    <main
      css={`  
  max-width: 1140px;
  margin: auto;
  `}
    >
      {children}
    </main>
  </div>;
