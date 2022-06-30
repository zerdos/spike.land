/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { QRious } from "react-qrious";

import { Fab, QrCode } from "./mui";

const QR: FC<{ url: string }> = ({ url }) => <QRious value={url} />;

export const QRButton: FC<{ url: string }> = ({ url }) => {
  const [showQR, setQR] = useState(false);
  return (
    <motion.div
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
            key={url || "http://spike.land"}
            url={url || "/live/coder/public"}
          />
        )
        : (
          <Fab>
            <QrCode />
          </Fab>
        )}
    </motion.div>
  );
};
