/** @jsx jsx */


import React, { useState, useEffect } from 'react';
import {css, jsx} from "@emotion/react"

import { motion } from "framer-motion";




import logo from './logo.svg';
import './App.css';

import Fab from "@material-ui/core/Fab";
// import QrCode from "@material-ui/icons/QrCode";

interface AppProps {}

function App({}: AppProps) {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p css={css`
        color: #000;
        `}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      
        <p>
          Page has been open for <code>{count}</code> seconds.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;



const QR: React.FC<{ url: string }> = ({ url }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const load = async () => {
      const { QRious } = await new Function(`return import(
        "https://spike.land/modules/QRious.mjs"
      );`)();
      const options = {
        size: 220,
        element: canvasRef.current,
        foregroundAlpha: 0.9,
        foreground: "white",
        backgroundAlpha: 1,
        padding: 16,
        background: "#1e1e1e",
        value: url,
      };

      const qr = new QRious(options);
    };
    load();
  }, [url]);

  return <canvas
    css={css`
        border-radius: 16px;
        margin-bottom: 8px;
  `}
    ref={canvasRef}
  />;
};

export const QRButton: React.FC<{ url: string }> = ({ url }) => {
  const [showQR, setQR] = React.useState(false);
  return <motion.div
    animate={{
      width: showQR ? 220 : 56,
      height: showQR ? 240 : 48,
    }}
    onClick={(e) => {
      setQR(!showQR);
    }}
    css={css`
                margin-bottom: 12px;
              `}
  >
    {/* {showQR ? <QR key={url} url={url + "edit/"} /> : <Fab
      variant="extended"
      color="secondary"
      onClick={() => {
        setQR(!showQR);
      }}
    > */}
      {/* <QrCode /> */}
    {/* </Fab>} */}
  </motion.div>;
};
