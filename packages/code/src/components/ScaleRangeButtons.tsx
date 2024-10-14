import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ScaleRangeButtonsProps = {
  scaleRange: number;
  setScaleRange: (value: number) => void;
  sizes: number[];
  maxScaleRange: number;
};

export const ScaleRangeButtons: React.FC<ScaleRangeButtonsProps> = ({
  scaleRange,
  setScaleRange,
  sizes,
  maxScaleRange,
}) => {
  return (
    <motion.div
      layout
      className="overflow-hidden flex justify-evenly"
      initial={{ height: 0, width: 0 }}
      animate={{ height: 42, width: "100%" }}
    >
      <ToggleButtonGroup
        value={scaleRange}
        size="small"
        exclusive
        onChange={(_e, newScale) => {
          if (newScale !== null) setScaleRange(newScale);
        }}
      >
        {Array.from(
          new Set([
            ...sizes.filter((x) => x < maxScaleRange),
            scaleRange,
            maxScaleRange,
          ]),
        )
          .sort((a, b) => a - b)
          .map((size) => (
            <ToggleButton key={size} value={size}>
              <span
                className={cn(
                  size === scaleRange ? "text-highlight" : "text-normal",
                )}
              >
                {size}%
              </span>
            </ToggleButton>
          ))}
      </ToggleButtonGroup>
    </motion.div>
  );
};
