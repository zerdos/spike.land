import { FC } from "react";
type ActionButtonsProps = {
  codeSpace: string;
  handleDownload: () => void;
  showChat: boolean;
  setShowChat: (show: boolean) => void;
};
export declare const ActionButtons: FC<ActionButtonsProps>;
export {};
