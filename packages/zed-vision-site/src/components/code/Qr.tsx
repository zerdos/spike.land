import { css, jsx, Global } from "@emotion/react";
/** @jsx jsx */
import React from "react";
import { waitForSignalAndRun } from "@zedvision/code/dist/hash";
import { QRious } from "@zedvision/qrious";
import { sha256 } from "../utils/sha256/sha256";

export const Qr = ( ) => {
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
  //@ts-ignore

  return (
    <div
      css={css` color: #ecf0f1;
      border-radius: 18px;
      padding: 0;
      
      background: rgba( 0, 0, 25, 0.4 );
      border: solid 1px rgba(255,255,255,0.1);
      background-clip: padding-box;
      backdrop-filter: blur(10px ); display: inline-block; `}>
      <div css={spinCubeCss(size)}>
        
          <div css={css`transform: translateZ(${size / 2}px);`}>{sides[0]}
          </div>
          <div css={`transform: rotateY(90deg) translateZ(${size / 2}px);`}>
            {sides[1]}
          </div>
          <div
            css={` transform: rotateY(90deg) rotateX(90deg) translateZ(${
              size / 2
            }px);`}>
            {sides[2]}
          </div>
          <div
            css={css` transform: translateZ( -${
              size / 2
            }px) rotateY(180deg) rotateZ(90deg) ;`}>
            {sides[3]}
          </div>
          <div
            css={` transform: rotateY(-90deg) rotateZ(90deg) translateZ(${
              size / 2
            }px);`}>
            {sides[4]}
          </div>
          <div css={`  transform: rotateX(-90deg) translateZ(${size / 2}px);`}>
            {sides[5]}
          </div>

          
        </div>
    </div>
  );
};

const r1 = Math.random() * 360 - 180;
const r2 = Math.random() * 360 - 180;
const r3 = Math.random() * 360 - 180;
const r4 = Math.random() * 360 - 180;

const r5 = Math.random() * 720 - 360;
const r6 = Math.random() * 720 - 360;
const r7 = Math.random() * 360 - 180;
const r8 = Math.random() * 360 - 180;

const spinCubeCss = (size: number) => css`
  position: relative;
  width: ${size}px; 
  height: ${size}px;
  animation-name: spincube;
  animation-timing-function: cubic-bezier(.57,-0.6,0,1.03);
  animation-iteration-count: infinite;
  animation-duration: 10s;
    /* perspective: 900px; */

  transform-style: preserve-3d;
  transform-origin:  ${size / 2}px  ${size / 2}px; 
  
 
      
      
  @keyframes spincube {
    from,to {
      transform: rotateX(0deg) rotateY(deg) rotateZ(0deg);
    }
    16% {
      transform: rotateX(${r1}deg) rotateY(${r2}deg); 
    }
    33% {
      transform: rotateY(${r4}deg) rotateZ(${r3}deg);
       }
    50% {
     transform:  rotateZ(${r5}deg) rotateX(${6}deg);
     
    }
    66% {
     transform: rotateX(${r7}deg) rotateY(${r3}deg) rotateZ(${r5}deg);
      }
    83% {
     transform: rotateY(${r8}deg) rotateX(${r6}deg);;
     }
  }

  



   div{
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border: 0;
    background: rgba(255,255,255,0.8);
    box-shadow: inset 0 0 20px rgba(255,0,0,0.6);
  }
`;

export default () => (
  <>
    <Global
      styles={css`
      body{
          background: #333;
           overflow: visble;
          margin: 300px;
          width: 0px;
          text-align: center;
         }  
    `}
    />
    <Qr />
  </>
);
