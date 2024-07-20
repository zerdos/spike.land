import { motion } from "framer-motion";
import { Fab } from "../mui";
import { MdFullscreen as FullscreenIcon } from "react-icons/md";
import { Share } from "../icons";
import { QRButton } from "../Qr.lazy";
import { FaDownload } from 'react-icons/fa';
import { css } from "@emotion/react";

type ActionButtonsProps = {
  codeSpace: string;
  handleDownload: () => void;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  codeSpace,
  handleDownload,
}) => {
  return (
    <motion.div
      layout
      css={css`overflow: hidden;`}
      initial={{ height: "0%", width: "0px" }}
      animate={{ height: "100%", width: "88px" }}
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
        <Fab
          key="fullscreen"
          onClick={() => {
            document.querySelector("#root")?.requestFullscreen();
          }}
        >
          <span
            css={css`
              font-size: 20pt;
            `}
          >
            <FullscreenIcon key="fs" />
          </span>
        </Fab>
        <QRButton url={`${location.origin}/live/${codeSpace}/public`} />
        <Fab
          key="Share"
          onClick={() => window.open(`/live/${codeSpace}/public`)}
        >
          <Share />
        </Fab>
        <Fab
          key="Download"
          onClick={handleDownload}
        >
          <FaDownload />
        </Fab>
      </div>
    </motion.div>
  );
};
