import { css, Global, jsx } from "@emotion/react";
/** @jsx jsx */
import React from "react";
import { waitForSignalAndRun } from "@zedvision/code/dist/hash";
import { QRious } from "@zedvision/qrious";
import { sha256 } from "../utils/sha256/sha256";
import {getUserId, shaDB} from "./getUser"

export const Qr = () => {
  const side1 = React.useRef<HTMLCanvasElement>(null);
  const side2 = React.useRef<HTMLCanvasElement>(null);
  const side3 = React.useRef<HTMLCanvasElement>(null);
  const side4 = React.useRef<HTMLCanvasElement>(null);
  const side5 = React.useRef<HTMLCanvasElement>(null);
  const side6 = React.useRef<HTMLCanvasElement>(null);

  const [retry, setRetry] = React.useState(100);
  const [urls, setUrl] = React.useState({ current: "", last: "" });

  const [cubeSides, setQrCube] = React.useState<{
    [key: string]: QRious;
  }>({});

  const setQR = (
    side: number,
    color: string,
    element: HTMLCanvasElement | null,
  ) => {
    const options = {
      size: 220,
      element: element!,
      foregroundAlpha: 0.9,
      foreground: color,
      backgroundAlpha: 1,
      padding: 10,
      background: "black",
      value: urls.current,
    };

    const qr = `qr${side}`;

    if (typeof cubeSides[qr] === "undefined") {
      cubeSides[qr] = new QRious(options);
    }

    if (cubeSides[qr].get().value !== urls.current) {
      cubeSides[qr].value = urls.current;
    }

    return cubeSides[qr];
  };

  React.useEffect(() => {
    const connect = async () => {
    
      const secret = Math.random() + "-" + Math.random() + "-" + Math.random();
      const key = (await sha256(secret)).slice(0, 8);

      const url = `https://zed.vision/${key}`;

      setUrl({ last: urls.current, current: url });
      setTimeout(() => setRetry((x: number) => x - 1), 20000);
    };
    if (typeof window !== "undefined" && retry > 0 && cubeState===1) connect();
  }, [retry]);

  React.useEffect(() => {
    const setSignal = (url: string) => {
      if (cubeState!==1) return;
      waitForSignalAndRun({
        signal: url,
        onSignal: async () => {
          

const uuid = await getUserId();
const userdata = await shaDB.get("uuid", "json");
await shaDB.put(uuid, {
  ...userdata,
  signal: url
});

          setTimeout(()=> window.location.href="https://blog.zed.vision/code/", 2000);
          setTimeout(()=>setCubeState(0));

        

          

          setTimeout(() => {
            setCubeState(-1);
          }, 6000);

          


        },
        onError: () => {
          console.log("Error while waiting for the signal", { url });
        },
        onExpired: () => {
          console.log("expired", { url });
        },
      });
    };

    const setSignals = () => {
      urls.last && setSignal(urls.last);
      urls.current && setSignal(urls.current);

      setQrCube({
        qr1: setQR(1, "red", side1.current),
        qr2: setQR(2, "#FFA52C", side2.current),
        qr3: setQR(3, "yellow", side3.current),
        qr4: setQR(4, "#35CB4A", side4.current),
        qr5: setQR(5, "#3C99DC", side5.current),
        qr6: setQR(6, "#DF3BCF", side6.current),
      });
    };
    if (typeof window !== "undefined" && retry > 0) setSignals();
  }, [urls]);

  const [cubeState, setCubeState] = React.useState(1);

  if (cubeState === -1) return <></>;

  return (
    <div
      css={css`
      display: inline-block;
       position: relative;
       padding: 100px;
       margin: 100px;
   
   border-radius: 18px;
    padding: 0;

   
   @keyframes byecube {
     from {
      transform: translateX(0px);
    }
   to {
      transform: translateY(-1000px);
    }
    };
    
    `}
    >
      <div
        css={css`
        position: absolute;
         animation-name:${cubeState ? "none" : "byecube"};
  animation-timing-function: cubic-bezier(.57,-0.6,0,1.03);
  animation-iteration-count: 1;
  animation-duration: 4s;
   transform-style: preserve-3d;
  transform-origin:  center center; 
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
    </div>
  );
};

//@ts-ignore
const Cube = ({ sides, size }) => {
  //@ts-ignore

  return (
    <div
      css={css`
      position: relative;
        display: inline-block; 
        perspective: 900px;

  perspective-origin: 40% 50% ;


  /* transform-origin:  100px 200px 0px;  */
  
        `}
    >
      <div css={spinCubeCss(size)}>
        <div
          css={css`
              transform: translateZ(${size / 2}px);
              `}
        >
          {sides[0]}
        </div>
        <div
          css={css`
            transform: rotateY(90deg) 
                       translateZ(${size / 2}px);
            `}
        >
          {sides[1]}
        </div>
        <div
          css={css`
                transform: rotateY(90deg) 
                           rotateX(90deg) 
                           translateZ(${size /
            2}px);
                `}
        >
          {sides[2]}
        </div>
        <div
          css={css` 
                transform: translateZ( -${size / 2}px) 
                           rotateY(180deg) 
                           rotateZ(90deg);
            `}
        >
          {sides[3]}
        </div>
        <div
          css={css` 
                transform: rotateY(-90deg) 
                           rotateZ(90deg) 
                           translateZ(${size / 2}px);
                `}
        >
          {sides[4]}
        </div>
        <div
          css={css`
            transform: rotateX(-90deg) 
                       translateZ(${size / 2}px);
            `}
        >
          {sides[5]}
        </div>
      </div>
    </div>
  );
};

const randoms = new Array(3).fill(0).map((x, i) =>
  (Math.random() * 360 - 180) * (i === 2 ? 2 : 1)
);
const r = randoms;

const spinCubeCss = (size: number) =>
  css`

  width: ${size}px; 
  height: ${size}px;
  animation-name: spincube;
  animation-timing-function: cubic-bezier(.57,-0.6,0,1.03);
  animation-iteration-count: infinite;
  animation-duration: 10s;
  transform-style: preserve-3d;
  
 
      
      
  @keyframes spincube {
    from,to {
      transform: rotateX(${r[1]}deg) rotateY(${r[2]}deg) rotateZ(${r[0]}deg);
    }
    16% {
      transform: rotateX(${r[1]}deg) rotateY(${r[0]}deg) rotateZ(${r[0]}deg);
    }
    33% {
      transform: rotateX(${r[2]}deg) rotateY(${r[0]}deg) rotateZ(${r[1]}deg);
       }
    50% {
     transform: rotateX(${r[2]}deg) rotateY(${r[1]}deg) rotateZ(${r[0]}deg);
    }
    66% {
     transform: rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg);
      }
    83% {
     transform: rotateX(${r[0]}deg) rotateY(${r[2]}deg) rotateZ(${r[1]}deg);
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
           overflow: visible;
          margin: 300px;
          width: 0px;
          text-align: center;
         }  
    `}
    />
    <Qr />
  </>
);
