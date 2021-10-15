import { useEffect, useState } from "react";
import { css, Global } from "@emotion/react";

const pageText = `The future is here, but not evenly distributed...`;

const FutureIsHere = () => {
  const [visibleChars, setVisibleChars] = useState(0);
  useEffect(() => {
    if (visibleChars < 50) {
      setTimeout(() => {
        setVisibleChars((x) => x + 1);
      }, Math.random() * 200);
    }
    // setVisibleChars(3);
  }, [setVisibleChars, visibleChars]);

  return (
    <>
      <code
        css={`
      color:navy;
    `}
      >
        {pageText.substr(0, visibleChars)}
      </code>

      <button css={buttonStyles("green")} onClick={() => setVisibleChars(0)}>
        Restart
      </button>
    </>
  );
};

const buttonStyles = (color: string) =>
  css`
  border-radius: 6px;
  display: block;
  padding: 0.5rem 0;
  margin-top: 20px;
  width: 4rem;
  background: ${color};
  color: white;
  border: none;
  :focus{
    outline: none;
  }
  `;

export default () => (
  <>
    <Global
      styles={css`
      body{
          background:white;
          margin: 100px;
        }  
    `}
    />
    <FutureIsHere />
  </>
);
