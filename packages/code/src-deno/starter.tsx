export const starter = `import React from "react";
import ReactDOM from "react-dom";
/** @jsx jsx */
import styled from "@emotion/styled";

const Counter = () => {
  const [clicks, setClicks] = React.useState(0);

  return <Container>
    <Button css={\`background: green\`} onClick={() => setClicks(clicks - 1)}>
      -
    </Button>
    {clicks}
    <Button css={\`background: red\`} onClick={() => setClicks(clicks + 1)}>
      +
    </Button>
  </Container>;
};

const Container = styled.div\`
  margin: 2em;
  display: inline-block;
  min-width: 200px;
  background: white;
  border: 4px dotted red;
  border-radius: 30px;
  padding: 1rem;
\`;

const Button = styled.button\`
  text-align: center;
  display: inline-block;
  border-radius: 6px;
  padding: 0.5rem 0;
  margin: 0.5rem 2rem;
  width: 4rem;
  color: white;
  border: none;
  :focus{
    outline: none;
  }
  \`;

export default Counter;

`;
