import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { css, Global } from "@emotion/react";
import { useState } from "react";
const Hello = () => {
    const [color, setColor] = useState("white");
    return (_jsxs("div", { css: css `
          color: ${color}
        `, children: [_jsx("h1", { children: "Hello World!" }), _jsxs("label", { children: ["You can change the color:", _jsx("input", { css: css `
              margin: 12px;
            `, value: color, onChange: (e) => {
                            setColor(e.target.value);
                        } })] })] }));
};
export default () => (_jsxs(_Fragment, { children: [_jsx(Global, { styles: css `
        body{
          background: deeppink;
          color: white;
          padding: 0 16px;
          margin: 0;
          overflow: overlay;
        }  
    ` }), _jsx(Hello, {})] }));
