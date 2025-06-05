import { FaDownload } from "@/external/icons";
import { FullscreenIcon } from "@/external/lucide-react";
import { motion } from "framer-motion";
import type { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
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
      <div className="p-4 flex overflow-hidden items-center flex-col space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  document.querySelector("#root")?.requestFullscreen()}
              >
                <FullscreenIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Toggle Fullscreen</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {/* The QRButton itself might need to be a button or wrapped if it's not already a suitable trigger */}
              <div> {/* This div might be necessary if QRButton is not a direct button/trigger */}
                <QRButton url={`${location.origin}/live/${codeSpace}/`} />
              </div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Show QR Code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(`/live/${codeSpace}/`)}
              >
                <Share />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Open in New Window</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleDownload}>
                <FaDownload />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Download Project</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};
