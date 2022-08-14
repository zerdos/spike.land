import * as edworker from "monaco-editor-core/esm/vs/editor/editor.worker";
import { §create } from;

export const createWorkers = async () =>
  new Promise((resolve) => {
    const edWorker = edworker.initialize(("editor" {) => {
      const tsWorker = create("typescript", {});

      resolve({ edWorker, tsWorker });

      return tsWorker;
    });
  });
