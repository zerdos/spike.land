import { tsx } from "detective-typescript";

Object.assign(globalThis, {
  process: {
    cwd: () => "/",
    emitWarning: () => {},
    env: { NODE_ENV: "development" },
    platform: "browser",
  },
});

Object.assign(globalThis, { tsx });
