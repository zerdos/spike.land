/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Emitter, Event as BaseEvent } from "../common/event";
export const domEvent = (element, type, useCapture) => {
  const fn = (e) => emitter.fire(e);
  const emitter = new Emitter({
    onFirstListenerAdd: () => {
      element.addEventListener(type, fn, useCapture);
    },
    onLastListenerRemove: () => {
      element.removeEventListener(type, fn, useCapture);
    },
  });
  return emitter.event;
};
export function stop(event) {
  return BaseEvent.map(event, (e) => {
    e.preventDefault();
    e.stopPropagation();
    return e;
  });
}
