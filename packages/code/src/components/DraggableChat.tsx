import { motion } from "framer-motion";
import { Resizable } from "re-resizable";
import { FC, useState } from "react";
import { IoClose } from "react-icons/io5";

interface DraggableChatProps {
  onClose: () => void;
  onCodeUpdate: (code: string) => void;
}

export const DraggableChat: FC<DraggableChatProps> = (
  { onClose },
) => {
  const [position, setPosition] = useState({
    x: window.innerWidth - 320,
    y: window.innerHeight - 420,
  });
  const [size, setSize] = useState({ width: 300, height: 400 });
  const [isResizing, setIsResizing] = useState(false);

  return (
    <motion.div
      drag={!isResizing}
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
        onResizeStart={() => setIsResizing(true)}
        onResizeStop={(_e, direction, _ref, d) => {
          setSize({
            width: size.width + d.width,
            height: size.height + d.height,
          });
          setPosition((prevPosition) => ({
            x: prevPosition.x - (direction.includes("left") ? d.width : 0),
            y: prevPosition.y - (direction.includes("top") ? d.height : 0),
          }));
          setIsResizing(false);
        }}
        minWidth={250}
        minHeight={300}
        enable={{
          top: false,
          right: true,
          bottom: true,
          left: false,
          topRight: false,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false,
        }}
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
        </div>
      </Resizable>
    </motion.div>
  );
};
