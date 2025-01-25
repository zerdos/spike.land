import type { FC } from "react";

import { m } from "framer-motion";

import { useState } from "react";

import { QRious } from "@/external/react-qrious";
import { QrCodeIcon } from "./icons";

import { Fab } from "@/external/mui-material";

// const QRiousLazy = (props) =>lazy(async () => {
// const {QRious} = await import("react-qrious");
// return {default: (()=>QRious(props))}
// })

// const QRious: FC<{ value: Record<string, unknown> }> = ({ value }) => (
//   <Suspense fallback={<p>..</p>}>
//     {QRiousLazy(value)}
//   </Suspense>
// );

export const QRButton: FC<{ url: string; }> = ({ url }) => {
  const [showQR, setQR] = useState(false);
  return (
    <m.div
      animate={{
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
          <Fab>
            <QrCodeIcon />
          </Fab>
        )}
    </m.div>
  );
};
export default QRButton;
