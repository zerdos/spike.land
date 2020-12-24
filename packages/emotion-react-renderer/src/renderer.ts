import { EmotionJSX } from "@emotion/react/types/jsx-namespace";

import React from "react"
import {render} from "react-dom";
import {jsx, css, Global} from "@emotion/react"

export {jsx}
export {css}
export {Global}

export const renderEmotion= (el: EmotionJSX.Element, container:HTMLElement)=>render(jsx(React.Fragment,{children: el}),container )

export default React;