/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import BaseSeverity from '../../../base/common/severity';
import { createDecorator } from '../../instantiation/common/instantiation';
export var Severity = BaseSeverity;
export const INotificationService = createDecorator('notificationService');
export class NoOpNotification {
}
