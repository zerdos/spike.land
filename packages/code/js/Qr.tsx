import { css } from "@emotion/react";
import { motion as m } from "framer-motion";

import type { FC } from "react";
import { useState } from "react";

import { QRious } from "react-qrious";
import { QrCodeIcon } from "./icons";

import { Fab } from "./mui";

// const QRiousLazy = (props) =>lazy(async () => {
// const {QRious} = await import("react-qrious");
// return {default: (()=>QRious(props))}
// })

// const QRious: FC<{ value: Record<string, unknown> }> = ({ value }) => (
//   <Suspense fallback={<p>..</p>}>
//     {QRiousLazy(value)}
//   </Suspense>
// );

export const QRButton: FC<{ url: string }> = ({ url }) => {
  const [showQR, setQR] = useState(false);
  return (
    <m.div
      animate={{
        width: showQR ? 200 : 56,
        height: showQR ? 220 : 48,
      }}
      onClick={() => {
        setQR(!showQR);
      }}
      css={css`
          margin-top: 12px;
          margin-bottom: 12px;
              `}
    >
      {showQR
        ? (
          <QRious
            key={url || origin + url}
            value={url || "/live/coder/public"}
          />
        )
        : (
          <Fab>
            <QrCodeIcon />
          </Fab>
        )}
    </m.div>
  );
};
