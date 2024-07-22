import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { MdFullscreen as FullscreenIcon } from "react-icons/md";
import { Share } from "../icons";
import { Fab } from "../mui";
import { QRButton } from "../Qr.lazy";
import { RiChatSmile3Line } from "react-icons/ri";
import { FC } from "react";

type ActionButtonsProps = {
  codeSpace: string;
  handleDownload: () => void;
  showChat: boolean;
  setShowChat: (show: boolean) => void;
};

export const ActionButtons: FC<ActionButtonsProps> = ({
  codeSpace,
  handleDownload,
  showChat,
  setShowChat,
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
        <Fab onClick={() => document.querySelector("#root")?.requestFullscreen()}>
          <span css={css`font-size: 20pt;`}>
            <FullscreenIcon />
          </span>
        </Fab>
        <QRButton url={`${location.origin}/live/${codeSpace}/public`} />
        <Fab onClick={() => window.open(`/live/${codeSpace}/public`)}>
          <Share />
        </Fab>
        <Fab onClick={handleDownload}>
          <FaDownload />
        </Fab>
        <Fab onClick={() => setShowChat(!showChat)}>
          <RiChatSmile3Line />
        </Fab>
      </div>
    </motion.div>
  );
};