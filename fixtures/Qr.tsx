/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { useEffect, useRef, useState } from "react";
import { dynamicImport } from "../../dynamicImport";
import { sha256 } from "../utils/sha256/sha256";

export const Qr = () => {
  const side1 = useRef<HTMLCanvasElement>(null);
  const side2 = useRef<HTMLCanvasElement>(null);
  const side3 = useRef<HTMLCanvasElement>(null);
  const side4 = useRef<HTMLCanvasElement>(null);
  const side5 = useRef<HTMLCanvasElement>(null);
  const side6 = useRef<HTMLCanvasElement>(null);

  const [retry, setRetry] = useState(100);
  // const [secrets, setSecrets] = useState({})
  const [urls, setUrl] = useState({ current: "", last: "" });

  interface IDummyQR {
    get: () => { value: string };
    value: string;
  }

  const [cubeSides, setQrCube] = useState<{
    [key: string]: IDummyQR;
  }>({});

  const setQR = async (
    side: number,
    color: string,
    element: HTMLCanvasElement | null,
  ) => {
    if (
      typeof window === "undefined"
    ) {
      return "painAndSufferingBecauseOfLegacyWebpackRendering" as unknown as IDummyQR;
    }

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
      console.log("Booo");
      const { QRious } = await dynamicImport("@spike.land/qrious");
      console.log({ QRious });

      cubeSides[qr] = new QRious(options) as IDummyQR;
    }

    if (cubeSides[qr].get().value !== urls.current) {
      cubeSides[qr].value = urls.current;
    }

    return cubeSides[qr] as IDummyQR;
  };

  useEffect(() => {
    const connect = async () => {
      const secret = Math.random() + "-" + Math.random() + "-" + Math.random();
      const key = (await sha256(secret)).slice(0, 8);

      const url = `https://spike.land/${key}`;
      // setSecrets(s=> {...s, [url]: secret});

      console.log(`waiting for url: ${url}`);

      setUrl({ last: urls.current, current: url });
      setTimeout(() => setRetry((x: number) => x - 1), 20000);
    };
    if (typeof window !== "undefined" && retry > 0 && cubeState === 1) {
      connect();
    }
  }, [retry]);

  useEffect(() => {
    const setSignal = async (url: string) => {
      if (cubeState !== 1) return;

      if (typeof window === "undefined") return;

      const { fetchSignal } = await dynamicImport("@spike.land/ipfs");

      const getData = await fetchSignal(url, 7);
      if (!getData) return;
      setCubeState(0);

      Loader(side1.current!, 220);
      Loader(side2.current!, 220);
      Loader(side3.current!, 220);
      Loader(side4.current!, 220);
      Loader(side5.current!, 220);
      Loader(side6.current!, 220);

      const signalData = await getData();

      setCubeState(-1);

      setTimeout(
        () => window.location.href = signalData.rootUrl,
        2000,
      );
    };

    const setSignals = async () => {
      urls.last && setSignal(urls.last);
      urls.current && setSignal(urls.current);

      setQrCube({
        qr1: await setQR(1, "red", side1.current),
        qr2: await setQR(2, "#FFA52C", side2.current),
        qr3: await setQR(3, "yellow", side3.current),
        qr4: await setQR(4, "#35CB4A", side4.current),
        qr5: await setQR(5, "#3C99DC", side5.current),
        qr6: await setQR(6, "#DF3BCF", side6.current),
      });
    };
    if (typeof window !== "undefined" && retry > 0) setSignals();
  }, [urls]);

  const [cubeState, setCubeState] = useState(1);

  return (
    <div
      css={css`
              display: inline-block;
              position: relative;
              margin: 100px;
              overflow: visible;
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
         animation-name:${
          (cubeState === 1 || cubeState === 0) ? "none" : "byecube"
        };
        animation-timing-function: cubic-bezier(.57,-0.6,0,1.03);
        animation-iteration-count: 1;
        animation-duration: 4s;
        transform-style: preserve-3d;
        transform-origin:  center center; 
      `}
      >
        <Cube
          size={220}
          animate={true}
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
const Cube = ({ sides, size: _size, animate }) => {
  const border = 0;
  const size = _size + 2 * border;
  //@ts-ignore

  return (
    <div
      css={css`
      position: relative;
        display: inline-block; c
        perspective: 900px;

         perspective-origin: 50% 50% ; 


  
        `}
    >
      <div css={spinCubeCss(size, animate)}>
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
                           translateZ(${
            size /
            2
          }px);
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

if (typeof window === "undefined") Math.random = () => 0.4; //elegant solution against the always changing build artifact

const randoms = new Array(3).fill(0).map((x, i) =>
  (Math.random() * 360 - 180) * (i === 2 ? 2 : 1)
);
const r = randoms;

const spinCubeCss = (size: number, animate: boolean) =>
  css`
    width: ${size}px; 
    height: ${size}px;
    animation-name: ${animate && "spincube"};
    animation-timing-function: cubic-bezier(.57,-0.6,0,1.03);
    animation-iteration-count: infinite;
    animation-duration: 10s;
    transform-style: preserve-3d;
    transform: rotateX(${r[1]}deg) rotateY(${r[2]}deg) rotateZ(${r[0]}deg);
    
  
        
        
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
      /* margin: 10px;
      padding: 10px; */
      /* border: 10px solid transparent; */
      background: rgba(255,255,255, .5);

      box-shadow: inset 0 0 50px rgba(255,0,0);
    }
`;

export default () => <Qr />;

const Loader = (c: HTMLCanvasElement, size: number) => {
  var w = c.width = size,
    h = c.height = size,
    ctx = c.getContext("2d")!,
    opts = {
      len: 12,
      count: 50,
      baseTime: 10,
      addedTime: 10,
      dieChance: .005,
      spawnChance: .1,
      sparkChance: .01,
      sparkDist: 10,
      sparkSize: 1,

      color: "hsl(hue,100%,light%)",
      baseLight: 50,
      addedLight: 10, // [50-10,50+10]
      shadowToTimePropMultiplier: 6,
      baseLightInputMultiplier: .01,
      addedLightInputMultiplier: .02,

      cx: w / 2,
      cy: h / 2,
      repaintAlpha: .01,
      hueChange: 0.1,
    },
    tick = 0,
    lines: Line[] = [],
    dieX = w / 2 / opts.len,
    dieY = h / 2 / opts.len,
    baseRad = Math.PI * 2 / 6;

  ctx.fillStyle = "transparent";
  ctx.fillRect(0, 0, w, h);

  function loop() {
    window.requestAnimationFrame(loop);

    ++tick;
    ctx.globalCompositeOperation = "source-over";
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(0,0,0,alp)".replace("alp", String(opts.repaintAlpha));
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";

    if (lines.length < opts.count && Math.random() < opts.spawnChance) {
      lines.push(new Line());
    }

    lines.map(function (line) {
      line.step();
    });
  }

  class Line {
    x = 0;
    y = 0;
    addedX = 0;
    addedY = 0;
    rad = 0;
    lightInputMultiplier = 0;
    color = "";
    time = 0;
    targetTime = 0;
    cumulativeTime = 0;
    constructor() {
      this.reset();
    }
    reset() {
      this.x = 0;
      this.y = 0;
      this.addedX = 0;
      this.addedY = 0;

      this.rad = 0;

      this.lightInputMultiplier = opts.baseLightInputMultiplier +
        opts.addedLightInputMultiplier * Math.random();

      this.color = opts.color.replace("hue", String(tick * opts.hueChange));
      this.cumulativeTime = 0;

      this.beginPhase();
    }
    beginPhase() {
      this.x += this.addedX;
      this.y += this.addedY;

      this.time = 0;
      this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;

      this.rad += baseRad * (Math.random() < .5 ? 1 : -1);
      this.addedX = Math.cos(this.rad);
      this.addedY = Math.sin(this.rad);

      if (
        Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX ||
        this.y > dieY || this.y < -dieY
      ) {
        this.reset();
      }
    }
    step() {
      ++this.time;
      ++this.cumulativeTime;

      if (this.time >= this.targetTime) {
        this.beginPhase();
      }

      var prop = this.time / this.targetTime,
        wave = Math.sin(prop * Math.PI / 2),
        x = this.addedX * wave,
        y = this.addedY * wave;

      ctx.shadowBlur = prop * opts.shadowToTimePropMultiplier;
      ctx.fillStyle = ctx.shadowColor = this.color.replace(
        "light",
        String(
          opts.baseLight +
            opts.addedLight *
              Math.sin(this.cumulativeTime * this.lightInputMultiplier),
        ),
      );
      ctx.fillRect(
        opts.cx + (this.x + x) * opts.len,
        opts.cy + (this.y + y) * opts.len,
        2,
        2,
      );

      if (Math.random() < opts.sparkChance) {
        ctx.fillRect(
          opts.cx + (this.x + x) * opts.len +
            Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) -
            opts.sparkSize / 2,
          opts.cy + (this.y + y) * opts.len +
            Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) -
            opts.sparkSize / 2,
          opts.sparkSize,
          opts.sparkSize,
        );
      }
    }
  }
  loop();
};
