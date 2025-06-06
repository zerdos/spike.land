import type { FC } from 'react'; // Added import
import { motion } from "framer-motion";
import { Toggle } from "@/components/ui/toggle";

interface ScaleRangeButtonsProps {
  scaleRange: number;
  setScaleRange: (value: number) => void;
  sizes: number[];
  maxScaleRange: number;
}

export const ScaleRangeButtons: FC<ScaleRangeButtonsProps> = ({ // Changed React.FC to FC
  scaleRange,
  setScaleRange,
  sizes,
  maxScaleRange,
}) => {
  const displaySizes = Array.from(
    new Set([
      ...sizes.filter((x) => x < maxScaleRange),
      scaleRange,
      maxScaleRange,
    ]),
  ).sort((a, b) => a - b);

  return (
    <motion.div
      layout
      className="overflow-hidden flex justify-evenly items-center" // Added items-center
      initial={{ height: 0, width: 0 }}
      animate={{ height: 42, width: "100%" }}
    >
      <div className="flex"> {/* Wrapper div for grouping Toggle buttons */}
        {displaySizes.map((size) => (
          <Toggle
            key={size}
            variant="outline" // Using outline variant
            size="sm" // Using sm size
            pressed={scaleRange === size}
            onPressedChange={(isPressed) => {
              if (isPressed) { // Only set scale if being pressed
                setScaleRange(size);
              }
            }}
            aria-label={`Set scale to ${size}%`}
          >
            {/* Removed the cn for text color, rely on Toggle's data-state styling */}
            {size}%
          </Toggle>
        ))}
      </div>
    </motion.div>
  );
};
