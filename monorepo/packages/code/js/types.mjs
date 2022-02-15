import tsWorker from "./dist/workers/language/typescript/ts.worker.workerJs";
import editorWorker from "./dist/workers/editor/editor.worker.workerJs";
import reactDts from "@types/react/index.d.ts";
import jsxRuntimeDts from "@types/react/jsx-runtime.d.ts";
import jsxDevRuntimeDts from "@types/react/jsx-dev-runtime.d.ts";
import reactExpDts from "@types/react/experimental.d.ts";
import globalDts from "@types/react/global.d.ts";
import propTypesDts from "@types/prop-types/index.d.ts";
import cssTypeDts from "csstype/index.d.ts";
import framerDts from "./types/framer.d.ts";

export const dtsFiles = {
  tsWorker,
  editorWorker,
  reactDts,
  jsxDevRuntimeDts,
  jsxRuntimeDts,
  reactExpDts,
  globalDts,
  propTypesDts,
  cssTypeDts,
  framerDts,
};
