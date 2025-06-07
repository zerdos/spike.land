import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaDownload } from "@/external/icons";
import { FullscreenIcon } from "@/external/lucide-react";
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
      <TooltipProvider>
        <div className="p-4 flex overflow-hidden items-center flex-col space-y-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => document.querySelector("#root")?.requestFullscreen()}
                aria-label="Toggle Fullscreen"
              >
                <FullscreenIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Toggle Fullscreen</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <QRButton url={`${location.origin}/live/${codeSpace}/`} />
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Show QR Code</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(`/live/${codeSpace}/`)}
                aria-label="Open in New Window"
              >
                <Share />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Open in New Window</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleDownload}
                aria-label="Download Project"
              >
                <FaDownload />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Download Project</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </motion.div>
  );
};
