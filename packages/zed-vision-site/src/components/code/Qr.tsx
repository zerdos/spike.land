import { css, jsx } from "@emotion/react";
/** @jsx jsx */
import React from "react";
import { waitForSignalAndJump } from "@zedvision/code/dist/hash";
import { QRious } from "@zedvision/qrious";
import { sha256 } from "../utils/sha256/sha256";

export const Qr: React.FC = () => {
  const ref = React.useRef(null);
  const [retry, setRetry] = React.useState(100);

  const [url, setUrl] = React.useState("");

  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    const connect = async () => {
      let qr: QRious | null = null;
      // const req = await fetch("https://zed.vision/token");
      // const data = await req.json();

      setCounter(60);
      // const key = data.key;
      const secret = Math.random() + "-" + Math.random() + "-" + Math.random();
      const key = (await sha256(
        secret,
      )).slice(0, 8);
      // const key = "12345678";
      const url = `https://zed.vision/${key}`;

      const options = {
        element: ref.current!,
        size: 200,
        foregroundAlpha: .9,
        foreground: "red",
        padding: 12,
        backgroundAlpha: 0.8,
        background: "black",
        value: url,
      };

      if (qr === null) {
        qr = new QRious(
          options,
        );
      }
      if (qr.get().value !== url) qr.set(options);
      setUrl(url);
      //const check = await fetch(`https://zed.vision/check?key=${key}`);
      //const res = await check.json();
      // if (res.expired === false) {
      //  location.href = "https://zed.vision/code/";
      // }
      setTimeout(() => setRetry((x: number) => x - 1), 4000);

      // const toCheck = await hash(url, true);
      setTimeout(async () => await waitForSignalAndJump(url));
    };
    if (typeof window !== "undefined" && retry > 0) connect();
  }, [retry]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && counter) {
      setTimeout(() => setCounter((x: number) => x - 1), 111);
    }
  }, [counter]);

  return <div
    css={`
      margin: 24px;
      text-align: center;
  `}
  >
    <a target="_blank" href={url}>
      {retry > 0 && <div
        css={css`
        background: blue;
        display: inline-block;
        padding: 10px 10px 0px 10px;
        border-radius: 12px;
        text-align: center;
    `}
      >
        <canvas
          css={css`
              width: 200px;
              height: 200px;
              display: block;
              box-shadow: 0 0 ${10 + 2 * counter}px 5px ${
            retry % 4 === 3
              ? "darkorange"
              : retry % 4 === 2
              ? "green"
              : "darkred"
          };
          `}
          ref={ref}
        >
        </canvas>
        <span
          css={css`
              display: block;
              font-family: Roboto;
              font-size: 20px;
              text-transform: uppercase; 
              color: white;
              margin-bottom: 12px;
            `}
        >
          Connect device
        </span>
      </div>}
    </a>
  </div>;
};
