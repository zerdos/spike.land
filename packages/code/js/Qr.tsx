/** @jsx jsx */

import Fab  from "@mui/material/Fab";
import { css, jsx } from "@emotion/react";
import { motion } from "framer-motion";
import React from "react";
import QrCode from "./icons/QrCode.jsx";

const QR: React.FC<{ url: string }> = ({ url }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const load = async () => {
      const { QRious } = await import("@spike.land/qrious");
      const options = {
        size: 200,
        element: canvasRef.current,
        foregroundAlpha: 0.9,
        foreground: "white",
        backgroundAlpha: 1,
        padding: 16,
        background: "#1e1e1e",
        value: url,
      };

      const qr = new QRious(options);
    };
    load();
  }, [url]);

  return (
    <canvas
      css={css`
        border-radius: 16px;
        margin-bottom: 8px;
  `}
      ref={canvasRef}
    />
  );
};

export const QRButton: React.FC<{ url: string }> = ({ url }) => {
  const [showQR, setQR] = React.useState(false);
  return (
    <motion.div
      animate={{
        width: showQR ? 200 : 56,
        height: showQR ? 220 : 48,
      }}
      onClick={(e) => {
        setQR(!showQR);
      }}
      css={css`
                margin-bottom: 12px;
              `}
    >
      {showQR ? <QR key={url} url={url + "/edit/"} /> : (
        <Fab
          variant="extended"
          color="secondary"
          onClick={() => {
            setQR(!showQR);
          }}
        >
          <QrCode />
        </Fab>
      )}
    </motion.div>
  );
};
