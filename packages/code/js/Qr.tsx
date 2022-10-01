import { css } from "@emotion/react";
import { motion as m } from "framer-motion";

import { lazy, Suspense, useState } from "react";

import { MdQrCode2 as QrCode } from "react-icons/md";

import { Fab } from "./mui";

interface QrProps {
  url: string
}

const QR =({ url }:QrProps) => <QRious value={url} />;

const QRiousLazy = lazy(() =>
  import("react-qrious").then(({ QRious }) => ({ default: QRious }))
);
const QRious = ({ value }) => (
 <Suspense fallback={<span>...</span>}>
    <QRiousLazy value={value} />
  </Suspense>
  
);

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
          <QR
            key={url || origin + url}
            url={url || "/live/coder/public"}
          />
        )
        : (
          <Fab>
            <span css={css`font-size: 20pt;`}>
              <QrCode />
            </span>
          </Fab>
        )}
    </m.div>
  );
};
