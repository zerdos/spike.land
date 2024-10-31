import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionContainerProps {
  children: React.ReactNode;
  bottom: number;
  right: number;
  bgColor: [number, number, number];
  isChatOpen: boolean;
  className?: string;
}

export const MotionContainer = ({
  children,
  bottom,
  right,
  bgColor,
  isChatOpen,
  className,
}: MotionContainerProps) => {
  const [r, g, b] = bgColor;
  const backgroundColor = `rgba(${r}, ${g}, ${b}, 0.5)`;

  return (
    <motion.div
      layout
      initial={{
        padding: 0,
        top: 0,
        right: 0,
        borderRadius: 0,
      }}
      animate={{
        padding: 8,
        top: bottom,
        right: isChatOpen ? window.innerWidth / 2 : right,
        backgroundColor,
        borderRadius: 16,
      }}
      style={{ backgroundColor }}
      className={cn(
        "fixed z-[1002] backdrop-blur-md",
        className
      )}
      drag
      dragMomentum={false}
      dragConstraints={{
        left: -window.innerWidth,
        right: window.innerWidth - 20 - window.innerWidth / 6,
        bottom: window.innerHeight,
      }}
      dragElastic={0.5}
    >
      {children}
    </motion.div>
  );
};