import * as React from "react";
import styled from "@emotion/styled";
import { hash } from "../components/utils/sha";
// import { CounterTS } from "../components/Counter";
import { Helmet } from "react-helmet";

import { motion, useMotionValue, useTransform } from "framer-motion";
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
max-height: 100%;
`;

const Sha256Writer: React.FC<{ onNew: (hash: string) => void }> = (
  { onNew },
) => {
  const [{ text, sha256Hash }, changeText] = React.useState(
    { text: "", sha256Hash: "" },
  );
  return <DivContainer>
    <p>Start to type</p>
    <StyledTextArea
      onChange={async (e) => {
        const textContent = e.target.value;
        const sha256Hash = await hash(textContent);
        onNew(sha256Hash);
        changeText({ text: textContent, sha256Hash });
      }}
      value={text}
    />
    <pre>{sha256Hash}</pre>
  </DivContainer>;
};

export const MyComponent: React.FC<
  { height?: number; width?: number; adjust: (x: number, y: number) => void }
> = ({ height = 400, width = 400, adjust }) => {
  const x = useMotionValue(0);

  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ff008c", "#7700ff", "rgb(230, 255, 0)"],
  );

  return (<>
    <motion.div
      layout
      style={{ background, height, width, position: "relative" }}
    >
    </motion.div>

    <motion.div
      // layout
      drag={true}
      dragElastic={0.5}
      // dragListener={true}
      // onDrag={
      // (event, info) => {if (event.layerX<0) adjust(event.layerX, event.layerY);}
      // }
      dragConstraints={{
        top: 0,
        bottom: height - 100,
        left: 0,
        right: width - 100,
      }}
      style={{ position: "absolute", x }}
    >
      <Styled>
        <Sha256Writer onNew={(hash) => console.log(hash)} />
      </Styled>
    </motion.div>
  </>);
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  text-align: center;
  display: flex;
  place-content: center;
  place-items: center;
  background: rgba(0, 85, 255, 1);
  perspective: 1000px;
`;

export default function Page() {
  const [{ width, height }, changeSize] = React.useState(
    { height: 600, width: 400 },
  );
  React.useEffect(() => {
    setInterval(() => {
      const x = Math.random() * 200 - 100;
      const total = 600 * 400;
      const newWith = Math.floor(width - x);
      const newHeight = Math.floor(total / newWith);
      changeSize({ height: newHeight, width: newWith });
    }, 1000);
  }, []);

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
      {typeof window !== "undefined"
        ? <MyComponent
          height={height}
          width={width}
          adjust={(x, y) => {
            const total = width * height;
            const newWith = width - x;
            const newHeight = total / newWith;
            changeSize({ height: newHeight, width: newWith });
          }}
        />
        : "Loading"}
    </Container>
  </>;
}
