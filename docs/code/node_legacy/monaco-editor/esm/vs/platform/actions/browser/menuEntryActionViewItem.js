/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { createCSSRule, asCSSUrl, ModifierKeyEmitter } from '../../../base/browser/dom.js';
import { domEvent } from '../../../base/browser/event.js';
import { Separator } from '../../../base/common/actions.js';
import { IdGenerator } from '../../../base/common/idGenerator.js';
import { toDisposable, MutableDisposable, DisposableStore } from '../../../base/common/lifecycle.js';
import { localize } from '../../../nls.js';
import { MenuItemAction } from '../common/actions.js';
import { IContextMenuService } from '../../contextview/browser/contextView.js';
import { IKeybindingService } from '../../keybinding/common/keybinding.js';
import { INotificationService } from '../../notification/common/notification.js';
import { ThemeIcon } from '../../theme/common/themeService.js';
import { ActionViewItem } from '../../../base/browser/ui/actionbar/actionViewItems.js';
import { DropdownMenuActionViewItem } from '../../../base/browser/ui/dropdown/dropdownActionViewItem.js';
import { isWindows, isLinux } from '../../../base/common/platform.js';
export function createAndFillInActionBarActions(menu, options, target, isPrimaryGroup) {
    const groups = menu.getActions(options);
    // Action bars handle alternative actions on their own so the alternative actions should be ignored
    fillInActions(groups, target, false, isPrimaryGroup);
    return asDisposable(groups);
}
function asDisposable(groups) {
    const disposables = new DisposableStore();
    for (const [, actions] of groups) {
        for (const action of actions) {
            disposables.add(action);
        }
    }
    return disposables;
}
function fillInActions(groups, target, useAlternativeActions, isPrimaryGroup = group => group === 'navigation') {
    for (let tuple of groups) {
        let [group, actions] = tuple;
        if (useAlternativeActions) {
            actions = actions.map(a => (a instanceof MenuItemAction) && !!a.alt ? a.alt : a);
        }
        if (isPrimaryGroup(group)) {
            const to = Array.isArray(target) ? target : target.primary;
            to.unshift(...actions);
        }
        else {
            const to = Array.isArray(target) ? target : target.secondary;
            if (to.length > 0) {
                to.push(new Separator());
            }
            to.push(...actions);
        }
    }
}
const ids = new IdGenerator('menu-item-action-item-icon-');
const ICON_PATH_TO_CSS_RULES = new Map();
let MenuEntryActionViewItem = class MenuEntryActionViewItem extends ActionViewItem {
    constructor(_action, _keybindingService, _notificationService) {
        super(undefined, _action, { icon: !!(_action.class || _action.item.icon), label: !_action.class && !_action.item.icon });
        this._action = _action;
        this._keybindingService = _keybindingService;
        this._notificationService = _notificationService;
        this._wantsAltCommand = false;
        this._itemClassDispose = this._register(new MutableDisposable());
        this._altKey = ModifierKeyEmitter.getInstance();
    }
    get _commandAction() {
        return this._wantsAltCommand && this._action.alt || this._action;
    }
    onClick(event) {
        event.preventDefault();
        event.stopPropagation();
        this.actionRunner.run(this._commandAction, this._context)
            .then(undefined, err => this._notificationService.error(err));
    }
    render(container) {
        super.render(container);
        this._updateItemClass(this._action.item);
        let mouseOver = false;
        let alternativeKeyDown = this._altKey.keyStatus.altKey || ((isWindows || isLinux) && this._altKey.keyStatus.shiftKey);
        const updateAltState = () => {
            const wantsAltCommand = mouseOver && alternativeKeyDown;
            if (wantsAltCommand !== this._wantsAltCommand) {
                this._wantsAltCommand = wantsAltCommand;
                this.updateLabel();
                this.updateTooltip();
                this.updateClass();
            }
        };
        if (this._action.alt) {
            this._register(this._altKey.event(value => {
                alternativeKeyDown = value.altKey || ((isWindows || isLinux) && value.shiftKey);
                updateAltState();
            }));
        }
        this._register(domEvent(container, 'mouseleave')(_ => {
            mouseOver = false;
            updateAltState();
        }));
        this._register(domEvent(container, 'mouseenter')(e => {
            mouseOver = true;
            updateAltState();
        }));
    }
    updateLabel() {
        if (this.options.label && this.label) {
            this.label.textContent = this._commandAction.label;
        }
    }
    updateTooltip() {
        if (this.label) {
            const keybinding = this._keybindingService.lookupKeybinding(this._commandAction.id);
            const keybindingLabel = keybinding && keybinding.getLabel();
            const tooltip = this._commandAction.tooltip || this._commandAction.label;
            this.label.title = keybindingLabel
                ? localize('titleAndKb', "{0} ({1})", tooltip, keybindingLabel)
                : tooltip;
        }
    }
    updateClass() {
        if (this.options.icon) {
            if (this._commandAction !== this._action) {
                if (this._action.alt) {
                    this._updateItemClass(this._action.alt.item);
                }
            }
            else if (this._action.alt) {
                this._updateItemClass(this._action.item);
            }
        }
    }
    _updateItemClass(item) {
        var _a, _b;
        this._itemClassDispose.value = undefined;
        const icon = this._commandAction.checked && ((_a = item.toggled) === null || _a === void 0 ? void 0 : _a.icon) ? item.toggled.icon : item.icon;
        if (ThemeIcon.isThemeIcon(icon)) {
            // theme icons
            const iconClass = ThemeIcon.asClassName(icon);
            if (this.label && iconClass) {
                this.label.classList.add(...iconClass.split(' '));
                this._itemClassDispose.value = toDisposable(() => {
                    if (this.label) {
                        this.label.classList.remove(...iconClass.split(' '));
                    }
                });
            }
        }
        else if (icon) {
            // icon path
            let iconClass;
            if ((_b = icon.dark) === null || _b === void 0 ? void 0 : _b.scheme) {
                const iconPathMapKey = icon.dark.toString();
                if (ICON_PATH_TO_CSS_RULES.has(iconPathMapKey)) {
                    iconClass = ICON_PATH_TO_CSS_RULES.get(iconPathMapKey);
                }
                else {
                    iconClass = ids.nextId();
                    createCSSRule(`.icon.${iconClass}`, `background-image: ${asCSSUrl(icon.light || icon.dark)}`);
                    createCSSRule(`.vs-dark .icon.${iconClass}, .hc-black .icon.${iconClass}`, `background-image: ${asCSSUrl(icon.dark)}`);
                    ICON_PATH_TO_CSS_RULES.set(iconPathMapKey, iconClass);
                }
                if (this.label) {
                    this.label.classList.add('icon', ...iconClass.split(' '));
                    this._itemClassDispose.value = toDisposable(() => {
                        if (this.label) {
                            this.label.classList.remove('icon', ...iconClass.split(' '));
                        }
                    });
                }
            }
        }
    }
};
MenuEntryActionViewItem = __decorate([
    __param(1, IKeybindingService),
    __param(2, INotificationService)
], MenuEntryActionViewItem);
export { MenuEntryActionViewItem };
let SubmenuEntryActionViewItem = class SubmenuEntryActionViewItem extends DropdownMenuActionViewItem {
    constructor(action, _notificationService, _contextMenuService) {
        var _a;
        let classNames;
        if (action.item.icon) {
            if (ThemeIcon.isThemeIcon(action.item.icon)) {
                classNames = ThemeIcon.asClassName(action.item.icon);
            }
            else if ((_a = action.item.icon.dark) === null || _a === void 0 ? void 0 : _a.scheme) {
                const iconPathMapKey = action.item.icon.dark.toString();
                if (ICON_PATH_TO_CSS_RULES.has(iconPathMapKey)) {
                    classNames = ['icon', ICON_PATH_TO_CSS_RULES.get(iconPathMapKey)];
                }
                else {
                    const className = ids.nextId();
                    classNames = ['icon', className];
                    createCSSRule(`.icon.${className}`, `background-image: ${asCSSUrl(action.item.icon.light || action.item.icon.dark)}`);
                    createCSSRule(`.vs-dark .icon.${className}, .hc-black .icon.${className}`, `background-image: ${asCSSUrl(action.item.icon.dark)}`);
                    ICON_PATH_TO_CSS_RULES.set(iconPathMapKey, className);
                }
            }
        }
        super(action, action.actions, _contextMenuService, { classNames: classNames, menuAsChild: true });
    }
};
SubmenuEntryActionViewItem = __decorate([
    __param(1, INotificationService),
    __param(2, IContextMenuService)
], SubmenuEntryActionViewItem);
export { SubmenuEntryActionViewItem };
