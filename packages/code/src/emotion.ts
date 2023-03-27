import * as EmotionReact from "@emotion/react";
import { Fragment, jsx as emotionJsx, jsxs } from "@emotion/react/jsx-runtime";

export const {
  __unsafe_useEmotionCache,
  CacheProvider,
  ClassNames,

  createElement,
  Global,
  css,
  keyframes,
  ThemeContext,
  ThemeProvider,
  useTheme,
  withEmotionCache,
  withTheme,
} = EmotionReact;

export function jsx(type, props, ...children) {
  if (props && props.style) {
    // Convert the style prop to a CSS class using Emotion's css function
    const classNameFromStyle = css(props.style);

    // Combine the generated class with any existing className prop
    const existingClassName = props.className || "";
    props.className = `${existingClassName} ${classNameFromStyle}`.trim();

    // Remove the style prop from the props object
    delete props.style;
  }

  // Call the original Emotion jsx runtime with the modified props
  return emotionJsx(type, props, ...children);
}

export { Fragment, jsxs };

// import * as EA from "@emotion/react";
