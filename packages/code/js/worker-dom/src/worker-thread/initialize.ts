import { TransferrableKeys } from "../transfer/TransferrableKeys";
import { HydrateableNode } from "../transfer/TransferrableNodes";
import { appendKeys as addCssKeys } from "./css/CSSStyleDeclaration";
import { Document } from "./dom/Document";
import { appendGlobalEventProperties } from "./dom/HTMLElement";
import { initializeStorage } from "./initialize-storage";
import { WorkerStorageInit } from "./initialize-storage";
import { store as storeString } from "./strings";

export function initialize(
  document: Document,
  strings: Array<string>,
  hydrateableNode: HydrateableNode,
  cssKeys: Array<string>,
  globalEventHandlerKeys: Array<string>,
  [innerWidth, innerHeight]: [number, number],
  localStorageInit: WorkerStorageInit,
  sessionStorageInit: WorkerStorageInit,
): void {
  addCssKeys(cssKeys);
  appendGlobalEventProperties(globalEventHandlerKeys);
  strings.forEach(storeString);
  (hydrateableNode[TransferrableKeys.childNodes] || []).forEach((child) =>
    document.body.appendChild(
      document[TransferrableKeys.hydrateNode](strings, child),
    )
  );
  const window = document.defaultView;
  window.innerWidth = innerWidth;
  window.innerHeight = innerHeight;
  initializeStorage(document, localStorageInit, sessionStorageInit);
}
