import type { FC } from 'react'; // Added import
import { motion } from "framer-motion";
import { Phone, Tablet, Tv } from "./icons";
import { Toggle } from "@/components/ui/toggle"; // Cleaned import line

interface BreakpointButtonsProps {
  width: number;
  setWidth: (value: number) => void;
  breakPoints: number[];
}

export const BreakpointButtons: FC<BreakpointButtonsProps> = ({ // Changed React.FC to FC
  width,
  setWidth,
  breakPoints,
}) => {
  return (
    <motion.div
      layout
      className="overflow-hidden flex justify-evenly items-center" // Added items-center
      initial={{ height: 0, width: 0 }}
      animate={{ height: 42, width: "100%" }}
    >
      <div className="flex"> {/* Wrapper div for grouping Toggle buttons */}
        {breakPoints.map((size, index) => (
          <Toggle
            key={size}
            variant="outline" // Using outline variant
            size="sm" // Using sm size, similar to MUI's "small"
            pressed={width === size}
            onPressedChange={(isPressed) => {
              if (isPressed) { // Only set width if being pressed
                setWidth(size);
              }
            }}
            aria-label={`Set width to ${size}px`}
          >
            {/* Removed the cn for text color, rely on Toggle's data-state styling */}
            {index === 0 ? <Phone /> : index === 1 ? <Tablet /> : <Tv />}
          </Toggle>
        ))}
      </div>
    </motion.div>
  );
};
