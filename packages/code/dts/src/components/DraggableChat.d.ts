import { FC } from "react";
interface DraggableChatProps {
    onClose: () => void;
    onCodeUpdate: (code: string) => void;
}
export declare const DraggableChat: FC<DraggableChatProps>;
export {};
