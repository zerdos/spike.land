export const starter = `import React from "react";
import ReactDOM from "react-dom"
/** @jsx jsx */
import styled from "@emotion/styled"

const Counter = () => {
  const [clicks, setClicks] = React.useState(0);

  return <Container>
    <Button css={\`background: green\`} onClick={() => setClicks(clicks - 1)}>-</Button>
    {clicks}
    <Button css={\`background: red\`} onClick={() => setClicks(clicks + 1)}>+</Button>
  </Container>
}

const Container = styled.div\`
  background: white;
  border: 6px solid grey;
  border-radius: 20px;
  padding: 1rem;
 \`

const Button = styled.button\`
  text-align: center;
  display: inline-block;
  border-radius: 6px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 3rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  :focus{
    outline: none;
  }
  \`

const elementToRender = document.getElementById("root");
ReactDOM.render(<Counter />, elementToRender);


`;
