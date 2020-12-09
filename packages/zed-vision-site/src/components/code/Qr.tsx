import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import QRious from "@zedvision/qrious";

export const Qr: React.FC<{ url: string }> = ({ url }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    new QRious(
      {
        element: ref.current,
        size: 200,
        foreground: "darkred",
        value: url + "?qr=true",
      },
    );
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
