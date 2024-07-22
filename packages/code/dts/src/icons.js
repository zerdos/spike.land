import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { css } from "@emotion/react";
import { MdPhoneAndroid, MdQrCode, MdShare, MdTabletAndroid, MdTv } from "react-icons/md";
const Wrap = ({ children }) => (_jsx("span", { css: css `
font-size:20pt;
`, children: children }));
export const QrCodeIcon = () => (_jsx(Wrap, { children: _jsx(MdQrCode, {}) }));
export const Phone = () => (_jsx(Wrap, { children: _jsx(MdPhoneAndroid, {}) }));
export const Share = () => (_jsx(Wrap, { children: _jsx(MdShare, {}) }));
export const Tablet = () => (_jsx(Wrap, { children: _jsx(MdTabletAndroid, {}) }));
export const Tv = () => (_jsx(Wrap, { children: _jsx(MdTv, {}) }));
