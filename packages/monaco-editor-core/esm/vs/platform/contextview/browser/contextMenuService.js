/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3
        ? target
        : desc === null
        ? desc = Object.getOwnPropertyDescriptor(target, key)
        : desc,
      d;
    if (
      typeof Reflect === "object" && typeof Reflect.decorate === "function"
    ) {
      r = Reflect.decorate(decorators, target, key, desc);
    } else {
      for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) {
          r = (c < 3
            ? d(r)
            : c > 3
            ? d(target, key, r)
            : d(target, key)) || r;
        }
      }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __param = (this && this.__param) || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};
import { ContextMenuHandler } from "./contextMenuHandler";
import { IContextViewService } from "./contextView";
import { ITelemetryService } from "../../telemetry/common/telemetry";
import { INotificationService } from "../../notification/common/notification";
import { IThemeService } from "../../theme/common/themeService";
import { IKeybindingService } from "../../keybinding/common/keybinding";
import { Disposable } from "../../../base/common/lifecycle";
import { ModifierKeyEmitter } from "../../../base/browser/dom";
let ContextMenuService = class ContextMenuService extends Disposable {
  constructor(
    telemetryService,
    notificationService,
    contextViewService,
    keybindingService,
    themeService,
  ) {
    super();
    this.contextMenuHandler = new ContextMenuHandler(
      contextViewService,
      telemetryService,
      notificationService,
      keybindingService,
      themeService,
    );
  }
  configure(options) {
    this.contextMenuHandler.configure(options);
  }
  // ContextMenu
  showContextMenu(delegate) {
    this.contextMenuHandler.showContextMenu(delegate);
    ModifierKeyEmitter.getInstance().resetKeyStatus();
  }
};
ContextMenuService = __decorate([
  __param(0, ITelemetryService),
  __param(1, INotificationService),
  __param(2, IContextViewService),
  __param(3, IKeybindingService),
  __param(4, IThemeService),
], ContextMenuService);
export { ContextMenuService };
