import { ToggleButton, ToggleButtonGroup } from "@/external/mui-material";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Phone, Tablet, Tv } from "./icons";

interface BreakpointButtonsProps {
  width: number;
  setWidth: (value: number) => void;
  breakPoints: number[];
}

export const BreakpointButtons: React.FC<BreakpointButtonsProps> = ({
  width,
  setWidth,
  breakPoints,
}) => {
  return (
    <motion.div
      layout
      className="overflow-hidden flex justify-evenly"
      initial={{ height: 0, width: 0 }}
      animate={{ height: 42, width: "100%" }}
    >
      <ToggleButtonGroup
        value={width}
        size="small"
        exclusive
        onChange={(_e, newSize) => {
          if (newSize !== null) setWidth(newSize);
        }}
      >
        {breakPoints.map((size, index) => (
          <ToggleButton key={size} value={size}>
            <span
              className={cn(
                width === size ? "text-highlight" : "text-normal",
              )}
            >
              {index === 0 ? <Phone /> : index === 1 ? <Tablet /> : <Tv />}
            </span>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </motion.div>
  );
};
