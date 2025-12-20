import { motion } from "framer-motion";

export const ScaledContent = (
  { children, innerHeight, width, scale, bgColor, rgba }: {
    children: React.ReactElement;
    innerHeight: number;
    width: number;
    scale: number;
    bgColor: number[];
    rgba: (r: number, g: number, b: number, a: number) => string;
  },
): React.ReactElement => (
  <motion.div
    transition={{ zoom: { type: "spring" }, delay: 0 }}
    className="origin-top-left inline-block rounded-lg overflow-hidden"
    style={{
      backgroundColor: rgba(
        bgColor[0] || 0,
        bgColor[1] || 0,
        bgColor[2] || 0,
        0.5,
      ),
    }}
    initial={{
      height: innerHeight,
      width: width,
      scale: 1,
    }}
    animate={{ height: innerHeight, width, scale }}
  >
    {children}
  </motion.div>
);
