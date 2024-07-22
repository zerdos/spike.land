import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { css } from "@emotion/react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { motion } from "framer-motion";
import { Phone, Tablet, Tv } from "../icons";
export const BreakpointButtons = ({ width, setWidth, breakPoints, }) => {
    return (_jsx(motion.div, { layout: true, css: css `
        overflow: hidden;
        display: flex;
        justify-content: space-evenly;
      `, initial: { height: 0, width: 0 }, animate: { height: 42, width: "100%" }, children: _jsx(ToggleButtonGroup, { value: width, size: "small", exclusive: true, onChange: (_e, newSize) => {
                if (newSize !== null)
                    setWidth(newSize);
            }, children: breakPoints.map((size, index) => (_jsx(ToggleButton, { value: size, children: _jsx("span", { css: css `
                color: ${width === size
                        ? "var(--text-color-highlight)"
                        : "var(--text-color-normal)"};
              `, children: index === 0 ? _jsx(Phone, {}) : index === 1 ? _jsx(Tablet, {}) : _jsx(Tv, {}) }) }, size))) }) }));
};
