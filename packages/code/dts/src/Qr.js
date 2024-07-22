import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { css } from "@emotion/react";
import { motion as m } from "framer-motion";
import { useState } from "react";
import { QRious } from "react-qrious";
import { QrCodeIcon } from "./icons";
import { Fab } from "@mui/material";
export const QRButton = ({ url }) => {
    const [showQR, setQR] = useState(false);
    return (_jsx(m.div, { animate: {
            width: showQR ? 200 : 56,
            marginLeft: showQR ? 8 : 0,
            marginRight: showQR ? -100 : 0,
            height: showQR ? 220 : 48,
        }, onClick: () => {
            setQR(!showQR);
        }, css: css `
          margin-top: 12px;
          margin-bottom: 12px;
              `, children: showQR
            ? (_jsx(QRious, { value: url || "/live/coder" }, url || origin + url))
            : (_jsx(Fab, { children: _jsx(QrCodeIcon, {}) })) }));
};
export default QRButton;
