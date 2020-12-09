import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import QRious from "@zedvision/qrious";

export const Qr: React.FC<{ url: string }> = ({ url }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    let qr: QRious = null;
    const connect = async (retry: number) => {
      const req = await fetch("https://code.zed.vision/connect?ww");
      const data = await req.json();
      const uuid = data.uuid;
      const url = `https://code.zed.vision/connect?uuid=${uuid}`;

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

      const check = await fetch(`https://code.zed.vision/check?uuid=uid`);
      const res = await check.json();
      if (res.expired === false) {
        location.href = "https://zed.vision/code";
      }
      console.log("expired");
    };
    if (typeof window !== "undefined") connect(3);
  }, []);

  return <a href={url}>
    <img
      css={css`
    display: inline-block;
    vertical-align: middle;
    box-shadow: 0 0 10px 5px darkred
    `}
      ref={ref}
    >
    </img>
  </a>;
};
