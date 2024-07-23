import { motion } from "framer-motion";
import { Resizable } from "re-resizable";
import { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import ChatInterface from "../ChatInterface";

interface DraggableChatProps {
  onClose: () => void;
  onCodeUpdate: (code: string) => void;
}

export const DraggableChat: FC<DraggableChatProps> = ({ onClose, onCodeUpdate }) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 320, y: window.innerHeight - 420 });
  const [size, setSize] = useState({ width: 300, height: 400 });

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{
        left: 0,
        right: window.innerWidth - size.width,
        top: 0,
        bottom: window.innerHeight - size.height,
      }}
      style={{
        position: "fixed",
        zIndex: 1000,
        x: position.x,
        y: position.y,
      }}
      onDragEnd={(_, info) => {
        setPosition({ x: info.point.x, y: info.point.y });
      }}
    >
      <Resizable
        size={size}
        onResizeStop={(e, direction, ref, d) => {
          setSize({
            width: size.width + d.width,
            height: size.height + d.height,
          });
        }}
        minWidth={250}
        minHeight={300}
      >
        <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="p-2 bg-purple-900 text-white flex justify-between items-center">
            <span>AI Chat</span>
            <button
              onClick={onClose}
              className="bg-transparent border-none text-white cursor-pointer text-xl"
            >
              <IoClose />
            </button>
          </div>
          <div className="flex-grow overflow-hidden">
            <ChatInterface onCodeUpdate={onCodeUpdate} />
          </div>
        </div>
      </Resizable>
    </motion.div>
  );
};
