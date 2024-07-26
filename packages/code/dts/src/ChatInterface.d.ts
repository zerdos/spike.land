import React from "react";
export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}
declare const ChatInterface: React.FC<{
    onCodeUpdate: (code: string) => void;
    isOpen: boolean;
    onClose: () => void;
}>;
export default ChatInterface;
