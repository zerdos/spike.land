import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import QRious from "@zedvision/qrious";

export const Qr: React.FC<{ url: string }> = ({ url }) => {
  const ref = React.useRef(null);
  const [retry, setRetry] = React.useState(3);
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    let qr: QRious = null;
    const connect = async () => {
      const req = await fetch("https://code.zed.vision/connect?ww");
      const data = await req.json();
      setCounter(60);
      const uuid = data.uuid;
      const url = `https://zed.vision/${uuid}`;

      if (qr !== null) {
        qr.value = url;
      } else {
        qr = new QRious(
          {
            element: ref.current,
            size: 200,
            foreground: "darkred",
            value: url,
          },
        );
      }

      const check = await fetch(`https://code.zed.vision/check?uuid=${uuid}`);
      const res = await check.json();
      if (res.expired === false) {
        location.href = "https://zed.vision/code/";
      }
      setRetry(retry - 1);
    };
    if (typeof window !== "undefined" && retry > 0) connect();
  }, [retry]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && counter) {
      setTimeout(() => setCounter((x: number) => x - 1), 1000);
    }
  }, [counter]);

  return <a href={url}>
    {retry > 0 && <img
      css={css`
    display: inline-block;
    vertical-align: middle;
    box-shadow: 0 0 ${10 +
        counter}px 5px ${
        retry === 3 ? "darkorange" : retry === 2 ? "green" : "darkred"
      };


    `}
      ref={ref}
    >
    </img>}
  </a>;
};
