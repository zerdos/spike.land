// @ts-ignore
import { upgradeElement } from "@ampproject/worker-dom/dist/main.mjs";
import { moveToWorker } from "./starter";

globalThis.runInWorker = (nameSpace: string) =>
  upgradeElement(moveToWorker(nameSpace), "/node_modules/@ampproject/worker-dom@0.34.0/dist/worker/worker.js");
