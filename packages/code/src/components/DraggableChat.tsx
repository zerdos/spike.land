import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { Resizable } from "re-resizable";
import { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import ChatInterface from "../Chat";

interface DraggableChatProps {
  onClose: () => void;
}

export const DraggableChat: FC<DraggableChatProps> = ({ onClose }) => {
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
        <div
          css={css`
            width: 100%;
            height: 100%;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              padding: 10px;
              background-color: #4a148c;
              color: white;
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <span>AI Chat</span>
            <button
              onClick={onClose}
              css={css`
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 20px;
              `}
            >
              <IoClose />
            </button>
          </div>
          <div
            css={css`
              flex-grow: 1;
            `}
          >
            <ChatInterface />
          </div>
        </div>
      </Resizable>
    </motion.div>
  );
};
