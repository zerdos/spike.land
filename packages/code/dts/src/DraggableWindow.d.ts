import { FC } from "react";
type DraggableWindowProps = {
    children: JSX.Element;
    handleAIModify: () => void;
    codeSpace: string;
    showChat: boolean;
    setShowChat: (show: boolean) => void;
    onCodeUpdate: (newCode: string) => void;
};
export declare const DraggableWindow: FC<DraggableWindowProps>;
export {};
