// add more experiment
// deno bundle src-deno/frontend/starter.tsx --no-check > save.js

import * as global from "https://unpkg.com/@types/react@latest/global.d.ts";
import * as propTypes from "https://unpkg.com/@types/prop-types@latest/index.d.ts";
import * as csstype from "https://unpkg.com/csstype@latest/index.d.ts";

/// <reference types="https://unpkg.com/@types/react@latest/index.d.ts" />
import React from "https://unpkg.com/react@17/umd/react.development.js";

/// <reference types="https://unpkg.com/@types/react-dom-server@latest/index.d.ts"/>
import ReactDOMServer from "https://unpkg.com/react-dom@17.0.1/umd/react-dom-server.browser.development.js";

const Counter = (
  { initial = 0 },
) => {
  const [clicks, setClicks] = React.useState(initial);

  return <div>
    <p>Clicks: <strong>{clicks}</strong></p>
    <button onClick={() => setClicks(clicks + 1)}>+</button>
    <button onClick={() => setClicks(clicks - 1)}>-</button>
  </div>;
};

const str = ReactDOMServer.renderToString(<Counter initial={0}>xx</Counter>);

export const starter = () => document.getElementById("root").innerHTML = str;
