/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";
import { importModule } from "./importScript.js";
import { getHash, hash } from "./hash.js";

let checkers = {
  num: 0,
  sum: 0,
};

export const Qr: React.FC = () => {
  const ref = React.useRef(null);
  const [retry, setRetry] = React.useState(100);

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

      // const req = await fetch("https://c.zed.vision/token");
      // const data = await req.json();

      setCounter(60);
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
      //const check = await fetch(`https://c.zed.vision/check?key=${key}`);
      //const res = await check.json();
      // if (res.expired === false) {
      //  location.href = "https://zed.vision/code/";
      // }
      setTimeout(() => setRetry((x) => x - 1), 4000);

      const toCheck = await hash(url, true);
      console.log({ toCheck });
      try {
        const res = toCheck.map(async (dig) => {
          checkers.num++;
          console.log({ awaiting: dig, ...checkers });
          const resultKey = new Promise(async (resolve, reject) => {
            setTimeout(() => reject(-1), 15000);

            const result = await getHash(dig, 10000);
            console.log({ result: dig });
            location.href = `https://ipfs.io/ipfs/${resultKey}`;
            resolve(result);
          });
        });
      } catch {
        checkers.num--;

        console.log({ catching: "next time", checkers });
        //next code maybe
      } finally {
        checkers.num--;

        console.log({ finally: "next time", checkers });
      }
    };
    if (typeof window !== "undefined" && retry > 0) connect();
  }, [retry]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && counter) {
      setTimeout(() => setCounter((x: number) => x - 1), 111);
    }
  }, [counter]);

  return <>
    <a href="https://code.zed.vision">
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
      {qrtoCheck.map((x) =>
        <li key={x}>
          {x}
        </li>
      )}
    </ul>}
  </>;
};
