/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { motion, MotionProps } from "framer-motion";
import { Fragment, lazy, Suspense, useEffect, useState } from "react";
import type { FC, HTMLAttributes } from "react";

const MotionMockDiv: FC<MotionProps & HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => <div {...props}>{children}</div>;

const moduleCache = {
  motion: null,
};

export const LazyMotion: FC<MotionProps> = ({ children, ...props }) => {
  const [motion, setMotionDiv] = useState({ div: null });

  useEffect(() => {
    (async () => {
      if (moduleCache.motion === null) {
        moduleCache.motion = import("framer-motion");
      }
      const { motion } = await moduleCache.motion;
      setMotionDiv(motion);
    })();
  }, []);

  const ChCont = <Fragment>{children}</Fragment>;

  // @ts-ignore
  return (
    <Suspense fallback={<div {...props}>{ChCont}</div>}>
      <motion.div {...props}>{ChCont}</motion.div>
    </Suspense>
  );
};
