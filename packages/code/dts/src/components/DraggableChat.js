import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { motion } from "framer-motion";
import { Resizable } from "re-resizable";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import ChatInterface from "../ChatInterface";
export const DraggableChat = ({ onClose }) => {
    const [position, setPosition] = useState({ x: window.innerWidth - 320, y: window.innerHeight - 420 });
    const [size, setSize] = useState({ width: 300, height: 400 });
    return (_jsx(motion.div, { drag: true, dragMomentum: false, dragConstraints: {
            left: 0,
            right: window.innerWidth - size.width,
            top: 0,
            bottom: window.innerHeight - size.height,
        }, style: {
            position: "fixed",
            zIndex: 1000,
            x: position.x,
            y: position.y,
        }, onDragEnd: (_, info) => {
            setPosition({ x: info.point.x, y: info.point.y });
        }, children: _jsx(Resizable, { size: size, onResizeStop: (e, direction, ref, d) => {
                setSize({
                    width: size.width + d.width,
                    height: size.height + d.height,
                });
            }, minWidth: 250, minHeight: 300, children: _jsxs("div", { className: "w-full h-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col", children: [_jsxs("div", { className: "p-2 bg-purple-900 text-white flex justify-between items-center", children: [_jsx("span", { children: "AI Chat" }), _jsx("button", { onClick: onClose, className: "bg-transparent border-none text-white cursor-pointer text-xl", children: _jsx(IoClose, {}) })] }), _jsx("div", { className: "flex-grow overflow-hidden", children: _jsx(ChatInterface, {}) })] }) }) }));
};
