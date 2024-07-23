import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useRef, useState } from "./reactMod";
const defaultIgnoreDimensions = [];
const defaultParentSizeStyles = { width: "100%", height: "100%" };
export default function ParentSize(
  {
    className,
    children,
    debounceTime = 300,
    ignoreDimensions = defaultIgnoreDimensions,
    parentSizeStyles = defaultParentSizeStyles,
    enableDebounceLeadingCall = true,
    ...restProps
  },
) {
  const target = useRef(null);
  const animationFrameID = useRef(0);
  const [state, setState] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });
  const resize = useMemo(() => {
    const normalized = Array.isArray(ignoreDimensions)
      ? ignoreDimensions
      : [ignoreDimensions];
    return debounce(
      (incoming) => {
        setState((existing) => {
          const stateKeys = Object.keys(existing);
          const keysWithChanges = stateKeys.filter((key) => existing[key] !== incoming[key]);
          const shouldBail = keysWithChanges.every((key) => normalized.includes(key));
          return shouldBail ? existing : incoming;
        });
      },
      debounceTime,
      { leading: enableDebounceLeadingCall },
    );
  }, [debounceTime, enableDebounceLeadingCall, ignoreDimensions]);
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { left, top, width, height } = entry?.contentRect ?? {};
        animationFrameID.current = window.requestAnimationFrame(() => {
          resize({ width, height, top, left });
        });
      });
    });
    if (target.current) {
      observer.observe(target.current);
    }
    return () => {
      window.cancelAnimationFrame(animationFrameID.current);
      observer.disconnect();
      resize.cancel();
    };
  }, [resize]);
  return (_jsx("div", {
    style: parentSizeStyles,
    ref: target,
    className: className,
    ...restProps,
    children: children({
      ...state,
      ref: target.current,
      resize,
    }),
  }));
}
