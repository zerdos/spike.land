import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { Fragment } from "react"
import {render} from "react-dom";
import {jsx} from "@emotion/react"

export {Fragment}
export {jsx}
export const renderEmotion= (el: EmotionJSX.Element, container:HTMLElement)=>render(jsx(Fragment,{children: el}),container )