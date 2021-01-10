import { css, jsx } from "@emotion/react";
/** @jsx jsx */
import React from "react";
import { waitForSignalAndRun } from "@zedvision/code/dist/hash";
import { QRious } from "@zedvision/qrious";
import { sha256 } from "../utils/sha256/sha256";

import "normalize.css";

export const Qr: React.FC<{ color?: string }> = ({ color }) => {
  const side1 = React.useRef(null);
  const side2 = React.useRef(null);
  const side3 = React.useRef(null);
  const side4 = React.useRef(null);
  const side5 = React.useRef(null);
  const side6 = React.useRef(null);

  const [retry, setRetry] = React.useState(100);
  const [lastUrl, setUrl] = React.useState("");

  React.useEffect(() => {
    const connect = async () => {
      let qr1: QRious | null = null;
      let qr2: QRious | null = null;
      let qr3: QRious | null = null;
      let qr4: QRious | null = null;
      let qr5: QRious | null = null;
      let qr6: QRious | null = null;

      // const req = await fetch("https://zed.vision/token");
      // const data = await req.json();
      // const key = data.key;
      const secret = Math.random() + "-" + Math.random() + "-" + Math.random();
      const key = (await sha256(secret)).slice(0, 8);

      // const key = "12345678";
      lastUrl &&
        waitForSignalAndRun({
          signal: lastUrl,
          onSignal: () => {
            console.log("signal Received", { lastUrl });
            window.location.href = lastUrl;
          },
          onError: () => {
            console.log("Error while waiting for the signal", { lastUrl });
          },
          onExpired: () => {
            console.log("expired", { lastUrl });
          },
        });
      const url = `https://zed.vision/${key}`;

      const options = {
        element: side1.current!,
        size: 220,
        foregroundAlpha: 0.9,
        foreground: "red",
        padding: 10,
        background: "black",
        value: url,
      };

      if (qr1 === null) {
        qr1 = new QRious(options);
        qr2 = new QRious({
          ...options,
          foreground: "#FFA52C",
          element: side2.current,
        });
        qr3 = new QRious({
          ...options,
          foreground: "yellow",
          element: side3.current,
        });
        qr4 = new QRious({
          ...options,
          foreground: "#35CB4A",
          element: side4.current,
        });
        qr5 = new QRious({
          ...options,
          foreground: "#3C99DC",
          element: side5.current,
        });
        qr6 = new QRious({
          ...options,
          foreground: "#DF3BCF",
          element: side6.current,
        });
      }
      if (qr1.get().value !== url) {
        qr1.set(options);
        qr2.set({ ...options, foreground: "#FFA52C", element: side2.current });
        qr3.set({ ...options, foreground: "yellow", element: side3.current });
        qr4.set({ ...options, foreground: "#35CB4A", element: side4.current });
        qr5.set({ ...options, foreground: "#3C99DC", element: side5.current });
        qr6.set({ ...options, foreground: "#DF3BCF", element: side6.current });
      }

      setTimeout(() => setRetry((x: number) => x - 1), 20000);
      setUrl(url);
      // const toCheck = await hash(url, true);
      waitForSignalAndRun({
        signal: url,
        onSignal: () => {
          console.log("signal received", { url });
          window.location.href = url;
        },
        onError: () => {
          console.log("Error while waiting for the signal", { url });
        },
        onExpired: () => {
          console.log("expired", { url });
        },
      });
    };
    if (typeof window !== "undefined" && retry > 0) connect();
  }, [retry]);

  return (
    <div
      onClick={() => window.open(lastUrl)}
      css={css`
      margin: 24px;
      text-align: center;
      box-sizing: inherit; }
  `}
    >
      <Cube
        size={220}
        sides={[
          <canvas ref={side1}></canvas>,
          <canvas ref={side2}></canvas>,
          <canvas ref={side3}></canvas>,
          <canvas ref={side4}></canvas>,
          <canvas ref={side5}></canvas>,
          <canvas ref={side6}></canvas>,
        ]}
      />
    </div>
  );
};

//@ts-ignore
const Cube = ({ sides, size }) => {
  return (
    <section
      css={css` 
      color: #333;
      border-radius: 18px;
      padding: 0px;
      background: rgba( 0, 0, 25, 0.4 );
      border: solid 1px rgba(24,24,24,0.7);
      background-clip: padding-box;
      backdrop-filter: blur(10px ); display: inline-block; `}
    >
      <div
        className="stage"
        css={css`
        
            width: ${size}px; 
            height: ${size}px; 
            padding: 0px; 
            margin: 10px;      
          
              
          @keyframes spincube {
            from,to {
              transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            }
            16% {
              transform: rotateY(-90deg);
            }
            33% {
              transform: rotateY(-90deg) rotateZ(90deg);
            }
            50% {
              transform: rotateY(-180deg) rotateZ(90deg);
            }
            66% {
              transform: rotateY(-270deg) rotateX(90deg);
            }
            83% {
              transform: rotateX(90deg);
            }
          }

            .cubespinner {

              animation-name: spincube;
              animation-timing-function: cubic-bezier(.57,-0.6,0,1.03);
              animation-iteration-count: infinite;
              animation-duration: 20s;

              transform-style: preserve-3d;

              transform-origin: ${size / 2}px ${size / 2}px 0;
            }

            .cubespinner div {
              position: absolute;
              width: ${size}px;
              height: ${size}px;
              border: 0;
              background: rgba(255,255,255,0.8);
              box-shadow: inset 0 0 20px rgba(255,0,0,0.6);
              line-height: 80px;
              vertical-align: middle;
              text-align: center;
              font-size: 80px;
            }

            .cubespinner .face1 {
              transform: translateZ(${size / 2}px);
            }
            .cubespinner .face2 {
              transform: rotateY(90deg) translateZ(${size / 2}px);
            }
            .cubespinner .face3 {
              transform: rotateY(90deg) rotateX(90deg) translateZ(${size /
          2}px);
            }
            .cubespinner .face4 {
              transform: rotateY(180deg) rotateZ(90deg) translateZ(${size /
          2}px);
            }
            .cubespinner .face5 {
              transform: rotateY(-90deg) rotateZ(90deg) translateZ(${size /
          2}px);
            }
            .cubespinner .face6 {
              transform: rotateX(-90deg) translateZ(${size / 2}px);
            }
            `}
      >
        <div className="cubespinner">
          <div className="face1">{sides[0]}</div>
          <div className="face2">{sides[1]}</div>
          <div className="face3">{sides[2]}</div>
          <div className="face4">{sides[3]}</div>
          <div className="face5">{sides[4]}</div>
          <div className="face6">{sides[5]}</div>
        </div>
      </div>
      <h3
        css="font-size: 24px; color:white; font-family: Roboto; padding: 10px 0 0 0"
      >
        Scan to connect!
      </h3>
    </section>
  );
};
