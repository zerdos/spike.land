import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { css, Global } from "@emotion/react";
import { useEffect, useState } from "react";
const pageText = "The future is here, but not evenly distributed...";
const FutureIsHere = () => {
    const [visibleChars, setVisibleChars] = useState(0);
    useEffect(() => {
        if (visibleChars < 50) {
            setTimeout(() => {
                setVisibleChars((x) => x + 1);
            }, Math.random() * 200);
        }
    }, [setVisibleChars, visibleChars]);
    return (_jsxs(_Fragment, { children: [_jsx("code", { css: css `
    `, children: pageText.substr(0, visibleChars) }), _jsx("button", { css: buttonStyles("green"), onClick: () => setVisibleChars(0), children: "Restart" })] }));
};
const buttonStyles = (color) => css `
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
export default () => (_jsxs(_Fragment, { children: [_jsx(Global, { styles: css `
      body{
          background:white;
          margin: 100px;
        }  
    ` }), _jsx(FutureIsHere, {})] }));
