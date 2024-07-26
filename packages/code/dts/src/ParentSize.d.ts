import React from "./reactMod";
export type ParentSizeProps = {
    className?: string;
    debounceTime?: number;
    enableDebounceLeadingCall?: boolean;
    ignoreDimensions?: keyof ParentSizeState | (keyof ParentSizeState)[];
    parentSizeStyles?: React.CSSProperties;
    children: (args: {
        ref: HTMLDivElement | null;
        resize: (state: ParentSizeState) => void;
    } & ParentSizeState) => React.ReactNode;
};
export type ParentSizeState = {
    width: number;
    height: number;
    top: number;
    left: number;
};
export type ParentSizeProvidedProps = ParentSizeState;
export default function ParentSize({ className, children, debounceTime, ignoreDimensions, parentSizeStyles, enableDebounceLeadingCall, ...restProps }: ParentSizeProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof ParentSizeProps>): import("@emotion/react/jsx-runtime").JSX.Element;
