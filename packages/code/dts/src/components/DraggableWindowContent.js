import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { css } from "@emotion/react";
import { ContentWrapper } from "./ContentWrapper";
import { ScaleRangeButtons } from "./ScaleRangeButtons";
import { ActionButtons } from "./ActionButtons";
import { BreakpointButtons } from "./BreakpointButtons";
import { ScaledContent } from "./ScaledContent";
export const DraggableWindowContent = ({ children, scaleRange, setScaleRange, width, setWidth, codeSpace, handleDownload, showChat, setShowChat, scale, sizes, maxScaleRange, breakPoints, innerHeight, bgColor, rgba, }) => (_jsxs("div", { style: { display: "flex" }, children: [_jsxs("div", { css: css `
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
        `, children: [_jsx(ScaleRangeButtons, { scaleRange: scaleRange, setScaleRange: setScaleRange, sizes: sizes, maxScaleRange: maxScaleRange }), _jsx(ContentWrapper, { scale: scale, innerHeight: innerHeight, width: width, bgColor: bgColor, rgba: rgba, type: "spring", children: _jsx(ScaledContent, { innerHeight: innerHeight, width: width, scale: scale, bgColor: bgColor, rgba: rgba, children: children }) }), _jsx(BreakpointButtons, { width: width, setWidth: setWidth, breakPoints: breakPoints })] }), _jsx(ActionButtons, { codeSpace: codeSpace, handleDownload: handleDownload, showChat: showChat, setShowChat: setShowChat })] }));
