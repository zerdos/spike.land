import { motion } from "framer-motion";

export const ContentWrapper = (
  { children, scale, innerHeight, width, bgColor, rgba, type }: {
    children: React.ReactElement;
    scale: number;
    innerHeight: number;
    width: number;
    bgColor: number[];
    rgba: (r: number, g: number, b: number, a: number) => string;
    type: string;
  },
) => (
  <motion.div
    transition={{ scale: { type } }}
    className="block rounded-lg"
    style={{
      backgroundColor: rgba(bgColor?.[0] ?? 0, bgColor?.[1] ?? 0, bgColor?.[2] ?? 0, 0.5),
    }}
    initial={{ height: innerHeight, width: innerWidth }}
    animate={{
      height: innerHeight * scale,
      width: width * scale,
    }}
  >
    {children}
  </motion.div>
);
