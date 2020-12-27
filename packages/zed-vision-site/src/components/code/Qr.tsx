/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { importModule } from "./importScript.js";
import { hash } from "./hash.js";

export const Qr: React.FC = () => {
  const ref = React.useRef(null);
  const [retry, setRetry] = React.useState(100);
  const [qrtoCheck, changeList] = React.useState([]);

  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    let qr;
    const connect = async () => {
      const { sha256 } = await importModule(
        "https://unpkg.com/@zedvision/sha256@10.12.14/sha256.js",
      );
      const { QRious } = await importModule(
        `https://unpkg.com/@zedvision/qrious@10.13.20/dist/qrious.esm.js`,
      );

      // const req = await fetch("https://code.zed.vision/token");
      // const data = await req.json();

      setCounter(20);
      // const key = data.key;
      const key = await sha256(
        Math.random() + "-" + Math.random() + "-" + Math.random(),
      );
      // const key = "12345678";
      const url = `https://zed.vision/${key}`;

      const options = {
        element: ref.current,
        size: 200,
        foregroundAlpha: .9,
        foreground: "red",
        padding: 12,
        backgroundAlpha: 0.8,
        background: "black",
        value: url,
      };
      if (qr) {
        qr.set(options);
      } else {
        qr = new QRious(
          options,
        );
      }
      //const check = await fetch(`https://code.zed.vision/check?key=${key}`);
      //const res = await check.json();
      // if (res.expired === false) {
      //  location.href = "https://zed.vision/code/";
      // }
      setTimeout(() => setRetry((x: number) => x - 1), 20000);
      const toCheck = await hash(url, true);

      changeList((x) => {
        return [...x, toCheck];
      });
    };
    if (typeof window !== "undefined" && retry > 0) connect();
  }, [retry]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && counter) {
      setTimeout(() => setCounter((x: number) => x - 1), 333);
    }
  }, [counter]);

  return <>
    <a href="/code/">
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
        <p
          css={css`
              font-family: Roboto;
              font-size: 20px;
              text-transform: uppercase; 
              color: white;
            `}
        >
          Connect device
        </p>
      </div>}
    </a>
    {false && <ul>
     {
           qrtoCheck.map(x=><li key={x} >
             {x}</li>
             )
           
           }
     </ul>}
  </>; 
};
