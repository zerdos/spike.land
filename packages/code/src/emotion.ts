import {
  CacheProvider,
  ClassNames,
  css,
  Global,
  jsx as emotionJsx,
  keyframes,
  ThemeContext,
  ThemeProvider,
  useTheme,
  withEmotionCache,
  withTheme,
} from "@emotion/react";
import { CSSObject } from "@emotion/react";
import { DetailedHTMLProps, ElementType, Fragment, HTMLAttributes } from "react";

type JSXElement = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

function jsx(
  type: ElementType,
  props: JSXElement | null,
  ...children: React.ReactNode[]
): React.ReactElement {
  const modifiedProps = processProps(props);
  return emotionJsx(type, modifiedProps, ...children);
}

function processProps(props: JSXElement | null): JSXElement | null {
  if (props && props.style) {
    const classNameFromStyle = css(props.style as CSSObject);
    const existingClassName = props.className || "";
    props.className = `${existingClassName} ${classNameFromStyle}`.trim();
    delete props.style;
  }

  return props;
}

const jsxs = jsx;

export {
  CacheProvider,
  ClassNames,
  css,
  Fragment,
  Global,
  jsx,
  jsxs,
  keyframes,
  ThemeContext,
  ThemeProvider,
  useTheme,
  withEmotionCache,
  withTheme,
};
