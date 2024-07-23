import { css } from "@emotion/react";
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Fab, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { MdFullscreen as FullscreenIcon } from "react-icons/md";
import { RiChatSmile3Line } from "react-icons/ri";
import { Share } from "../icons";
import { QRButton } from "../Qr.lazy";
export const ActionButtons = ({ codeSpace, handleDownload, showChat, setShowChat }) => {
  return (_jsx(motion.div, {
    layout: true,
    css: css`overflow: hidden;`,
    initial: { height: 0, width: 0 },
    animate: { height: "100%", width: 88 },
    children: _jsxs("div", {
      css: css`
          padding: 16px;
          display: flex;
          overflow: hidden;
          align-items: center;
          flex-direction: column;
        `,
      children: [
        _jsx(Tooltip, {
          title: "Toggle Fullscreen",
          placement: "left",
          children: _jsx(Fab, {
            onClick: () => document.querySelector("#root")?.requestFullscreen(),
            children: _jsx("span", { css: css`font-size: 20pt;`, children: _jsx(FullscreenIcon, {}) }),
          }),
        }),
        _jsx(Tooltip, {
          title: "Show QR Code",
          placement: "left",
          children: _jsx("div", { children: _jsx(QRButton, { url: `${location.origin}/live/${codeSpace}/public` }) }),
        }),
        _jsx(Tooltip, {
          title: "Open in New Window",
          placement: "left",
          children: _jsx(Fab, { onClick: () => window.open(`/live/${codeSpace}/public`), children: _jsx(Share, {}) }),
        }),
        _jsx(Tooltip, {
          title: "Download Project",
          placement: "left",
          children: _jsx(Fab, { onClick: handleDownload, children: _jsx(FaDownload, {}) }),
        }),
        _jsx(Tooltip, {
          title: "Toggle Chat",
          placement: "left",
          children: _jsx(Fab, { onClick: () => setShowChat(!showChat), children: _jsx(RiChatSmile3Line, {}) }),
        }),
      ],
    }),
  }));
};
