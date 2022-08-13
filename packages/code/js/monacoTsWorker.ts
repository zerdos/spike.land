import * as edworker from "monaco-editor-core/esm/vs/editor/editor.worker";
import { create } from "monaco-editor/esm/vs/language/typescript/ts.worker";

export const createWorkers = async () =>
  new Promise((resolve) => {
    const edWorker = edworker.initialize((ctx, opts) => {
      const tsWorker = create(ctx, opts);

      resolve({ edWorker, tsWorker });

      return tsWorker;
    });
  });
