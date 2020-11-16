import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "@emotion/styled";
import typography from "./utils/typography";
import { fonts } from "./utils/fonts";

const styles = typography.createStyles().replace(
  /first-child/gi,
  "first-of-type",
);
const StyledContent = styled.div`
--main-bg-color: white;

${fonts}

${styles}

body{
  margin: 0;
}

main{ 
  max-width: 1140px;
  margin: auto
}
`;

export const Layout: React.FC = ({ children }) =>
  <React.Fragment>
    <Helmet>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
    </Helmet>
    <StyledContent>
      <main>
        {children}
      </main>
    </StyledContent>
  </React.Fragment>;
