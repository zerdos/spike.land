import * as React from "react";

import styled from "@emotion/styled";
import { hash, unHash } from "../components/utils/sha";
import { Helmet } from "react-helmet";

import { motion, useMotionValue } from "framer-motion";

const Styled = styled.div`
  text-align: center;
  border-radius: 12px;
  width: 200px;
  height: 200px;
  display: flex;
  place-content: center;
  place-items: center;
  margin: 0;
  padding: 0;
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px 0px, rgba(0, 0, 0, 0.06) 0px 10px 15px 0px;
`;

const DivContainer = styled.div`
display: block;
width: 150px;
height: 150px;
overflow: hidden;
`;

const StyledTextArea = styled.textarea`
width: 100%;
min-height: 120px;
max-height: 100%;
`;

const Sha256Writer: React.FC<
  { prevText: string; onNew: (hash: string) => void }
> = (
  { onNew, prevText },
) => {
  const [{ text }, changeText] = React.useState(
    { text: prevText },
  );

  React.useEffect(() => {
    changeText({ text: prevText });
  }, [prevText]);
  return <DivContainer>
    <p>Start to type</p>
    <StyledTextArea
      onChange={async (e) => {
        const textContent = e.target.value;
        const sha256Hash = await hash(textContent);
        onNew(sha256Hash);
        changeText({ text: textContent });
      }}
      value={text}
    />
  </DivContainer>;
};

export const ShaContainer: React.FC = () => {
  const x = useMotionValue(0);

  const [hashList, changeBoxes] = React.useState<string[]>(
    [],
  );

  const [{ locX, locY, activeText }, setCords] = React.useState(
    { locX: 40, locY: 40, activeText: "" },
  );

  return (<div>
    {hashList.map((hash) => {
      const { locationX, locationY } = hashToCoordinates(hash);

      return <div
        onMouseEnter={(async () => {
          const text = await unHash(hash);
          const { locationX, locationY } = hashToCoordinates(hash);
          setCords({ locX: locationX, locY: locationY, activeText: text });
        })}
        style={{
          fontSize: "small",
          display: "inline-block",
          width: 10,
          height: 10,
          borderRadius: 5,
          background: "white",
          padding: 5,
          top: locationY + "%",
          left: locationX + "%",
          position: "absolute",
        }}
        key={hash}
      >
      </div>;
    })}

    <motion.div
      animate={{
        x: locX * window.innerWidth / 105 - 100,
        y: locY * window.innerHeight / 105 - 50,
        scale: 1,
        rotate: 0,
      }}
      style={{ position: "absolute", x }}
    >
      <Styled>
        <Sha256Writer
          prevText={activeText}
          onNew={(hash) => {
            const { locationY, locationX } = hashToCoordinates(hash);
            setCords(
              { locX: locationX, locY: locationY, activeText: activeText },
            );
            if (hashList.includes(hash)) return;
            changeBoxes([...hashList, hash]);
          }}
        />
      </Styled>
    </motion.div>
  </div>);
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  text-align: center;
  display: relative;
  background: rgba(0, 85, 255, 1);
  perspective: 1000px;
`;

export default function Page() {
  return <>
    <Helmet>
      <style type="text/css">
        {`
      html {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
      }`}
      </style>
    </Helmet>
    <Container>
      {typeof window !== "undefined" ? <ShaContainer /> : "Loading"}
    </Container>
  </>;
}

function hashToCoordinates(hash: string) {
  const length = hash.length;
  const size = 100 / Math.pow(4, length);

  let locationX = 0;
  let locationY = 0;

  for (let i = 1; i <= hash.length; i++) {
    let decNumber = parseInt(hash.substr(i - 1, 1), 16);

    const multiplier = 100 / Math.pow(4, i);
    locationY += (decNumber % 4) * multiplier;
    // decNumber -= decNumber%4;
    locationX += (Math.floor(decNumber / 4)) * multiplier;
  }
  return {
    size,
    locationX,
    locationY,
  };
}
