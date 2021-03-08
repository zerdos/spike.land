import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import * as Motion from "framer-motion";
import React, { Fragment } from "react";
import { css, Global, jsx } from "@emotion/react";
import { DraggableWindow } from "./DraggableWindow";
export { DraggableWindow };
export { React };
export { Fragment };
export { Motion };
export declare const AnimateSharedLayout: typeof Motion.AnimateSharedLayout;
export declare const motion: (<Props>(Component: string | React.ComponentClass<Props, any> | React.FunctionComponent<Props>, { forwardMotionProps }?: import("framer-motion/types/render/dom/motion-proxy").DomMotionComponentConfig | undefined) => Motion.CustomDomComponent<Props>) & import("framer-motion/types/render/dom/types").HTMLMotionComponents & import("framer-motion/types/render/dom/types").SVGMotionComponents & {
    custom: <Props_1>(Component: string | React.ComponentClass<Props_1, any> | React.FunctionComponent<Props_1>, { forwardMotionProps }?: import("framer-motion/types/render/dom/motion-proxy").DomMotionComponentConfig | undefined) => Motion.CustomDomComponent<Props_1>;
};
export declare const useSpring: typeof Motion.useSpring;
export { jsx };
export { css };
export { Global };
export declare const render: (el: EmotionJSX.Element, container: HTMLElement) => () => boolean;
export default React;
