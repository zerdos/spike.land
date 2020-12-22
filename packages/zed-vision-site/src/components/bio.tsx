import * as React from "react";
import styled from "@zedvisiom/emotion-styled";

import { rhythm } from "./utils/typography";
import img from "./zed-profile-pic.jpg";

const Container = styled.div`
  margin-top: ${rhythm(2.5)};
  display: flex;
  margin-bottom: ${rhythm(2.5)};
`;

const StyledImgDiv = styled.div`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  overflow: hidden;
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const objectives = [
  `a bit less
  frustrating.`,
  `more fun`,
  `great again`,
];

export const Bio = () => {
  let random = Math.random();

  if (typeof window === "undefined") random = 0.4; //have a consistent ssr

  return (
    <Container>
      <StyledImgDiv>
        <img
          alt="Zoltan Erdos"
          src={img}
        />
      </StyledImgDiv>
      <p>
        Written by <strong>
          Zoltan Erdos
        </strong>, who is interested to make software development
        {` ` + (objectives[Math.floor(random * objectives.length)] || "crazy.")}
        <br />
        <a href={`https://twitter.com/ZoltanErdos`}>
          Follow me on Twitter
        </a>
      </p>
    </Container>
  );
};
