import { FaDownload, MdFullscreen as FullscreenIcon } from "@/external/icons";
import { css } from "@emotion/react";
import { Fab, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { FC } from "react";
import { Share } from "../icons";
import { QRButton } from "../Qr.lazy";

type ActionButtonsProps = {
  codeSpace: string;
  handleDownload: () => void;
};

export const ActionButtons: FC<ActionButtonsProps> = ({
  codeSpace,
  handleDownload,
}) => {
  return (
    <motion.div
      layout
      css={css`overflow: hidden;`}
      initial={{ height: 0, width: 0 }}
      animate={{ height: "100%", width: 88 }}
    >
      <div
        css={css`
          padding: 16px;
          display: flex;
          overflow: hidden;
          align-items: center;
          flex-direction: column;
        `}
      >
        <Tooltip title="Toggle Fullscreen" placement="left">
          <Fab
            onClick={() => document.querySelector("#root")?.requestFullscreen()}
          >
            <span css={css`font-size: 20pt;`}>
              <FullscreenIcon />
            </span>
          </Fab>
        </Tooltip>
        <Tooltip title="Show QR Code" placement="left">
          <div>
            <QRButton url={`${location.origin}/live/${codeSpace}/iframe`} />
          </div>
        </Tooltip>
        <Tooltip title="Open in New Window" placement="left">
          <Fab onClick={() => window.open(`/live/${codeSpace}/iframe`)}>
            <Share />
          </Fab>
        </Tooltip>
        <Tooltip title="Download Project" placement="left">
          <Fab onClick={handleDownload}>
            <FaDownload />
          </Fab>
        </Tooltip>
      </div>
    </motion.div>
  );
};
