import type { FC } from "react";

import { m } from "framer-motion";

import { useState } from "react";

import { QRious } from "@/external/react-qrious";
import { QrCodeIcon } from "./icons";
import { Button } from "@/components/ui/button"; // Added import

export const QRButton: FC<{ url: string; }> = ({ url }) => {
  const [showQR, setQR] = useState(false);
  return (
    <m.div
      animate={{
        // Adjusted width and height for Button size="lg" (h-10 => 40px)
        // Fab was likely 56x48 or 56x56. Button lg is 40px height.
        // We'll keep animated height 48, width 56 to give it space.
        width: showQR ? 200 : 56,
        marginLeft: showQR ? 8 : 0,
        marginRight: showQR ? -100 : 0,
        height: showQR ? 220 : 48,
      }}
      onTap={() => {
        setQR(!showQR);
      }}
      className="mt-3 mb-3"
    >
      {showQR
        ? (
          <QRious
            key={url || origin + url}
            value={url || "/live/coder"}
          />
        )
        : (
          <Button
            variant="outline"
            size="lg"
            aria-label="Toggle QR Code"
            onClick={() => setQR(!showQR)} // Added onClick handler
          >
            <QrCodeIcon />
          </Button>
        )}
    </m.div>
  );
};
export default QRButton;
