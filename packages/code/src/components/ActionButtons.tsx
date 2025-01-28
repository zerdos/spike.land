import { FaDownload } from "@/external/icons";
import { FullscreenIcon } from "@/external/lucideReact";
import { Fab, Tooltip } from "@/external/mui-material";
import { motion } from "framer-motion";
import type { FC } from "react";
import { Share } from "./icons";
import { QRButton } from "./Qr.lazy";

interface ActionButtonsProps {
  codeSpace: string;
  handleDownload: () => void;
}

export const ActionButtons: FC<ActionButtonsProps> = ({
  codeSpace,
  handleDownload,
}) => {
  return (
    <motion.div
      layout
      className="overflow-hidden"
      initial={{ height: 0, width: 0 }}
      animate={{ height: "100%", width: 88 }}
    >
      <div className="p-4 flex overflow-hidden items-center flex-col">
        <Tooltip title="Toggle Fullscreen" placement="left">
          <Fab
            onClick={() => document.querySelector("#root")?.requestFullscreen()}
          >
            <span className="text-3xl">
              <FullscreenIcon />
            </span>
          </Fab>
        </Tooltip>
        <Tooltip title="Show QR Code" placement="left">
          <div>
            <QRButton url={`${location.origin}/live/${codeSpace}/`} />
          </div>
        </Tooltip>
        <Tooltip title="Open in New Window" placement="left">
          <Fab onClick={() => window.open(`/live/${codeSpace}/`)}>
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
