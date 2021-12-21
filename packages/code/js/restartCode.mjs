// import React from "react";

import { babelTransform } from "./babel.mjs";
import { restartX } from "./quickStart.mjs";

export const restart = async (code, target) => {
  const session = window.sess || {
    setChild: () => {},
  };
  window.sess = session;
  const transpiled = await babelTransform(code);
  return await restartX(transpiled, target, session.counter, session);
};
