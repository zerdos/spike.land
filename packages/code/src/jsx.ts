import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import type { ElementType } from "react";
import { Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import type { JSX } from "react/jsx-runtime";

export { Fragment };

export const jsx = (type: ElementType<any, keyof JSX.IntrinsicElements>, props: unknown, ...children: any[]) => {
  const { className, ...rest } = props as Record<string, any>;
  props = {
    ...rest,
    ...(className && { className: cn(className) }),
  };
  return _jsx(type, props, ...children);
};

export const jsxs = (type: ElementType<any, keyof JSX.IntrinsicElements>, props: unknown, ...children: any[]) => {
  const { className, ...rest } = props as Record<string, any>;
  props = {
    ...rest,
    ...(className && { className: cn(className) }),
  };
  return _jsxs(type, props, ...children);
};
