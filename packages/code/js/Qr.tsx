import { css } from "@emotion/react";
import { motion as m } from "framer-motion";

import React, { FC, Suspense, useState } from "react";

import { QrCodeIcon } from "./icons";

import { Fab } from "./mui";

interface QrProps {
  url: string;
}

const QR = ({ url }: QrProps) => <QRious value={url} />;

const QRiousLazy = React.lazy(() =>
  import("react-qrious").then(({ QRious }) => ({ default: QRious }))
) as FC<{ value: Object }>;

const QRious: FC<{ value: Object }> = ({ value }) => (
  <Suspense fallback={<p>..</p>}>
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
            <QrCodeIcon />
          </Fab>
        )}
    </m.div>
  );
};
