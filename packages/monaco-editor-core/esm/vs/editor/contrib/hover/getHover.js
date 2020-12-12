/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { coalesce } from "../../../base/common/arrays";
import { CancellationToken } from "../../../base/common/cancellation";
import { onUnexpectedExternalError } from "../../../base/common/errors";
import { registerModelAndPositionCommand } from "../../browser/editorExtensions";
import { HoverProviderRegistry } from "../../common/modes";
export function getHover(model, position, token) {
  const supports = HoverProviderRegistry.ordered(model);
  const promises = supports.map((support) => {
    return Promise.resolve(support.provideHover(model, position, token)).then(
      (hover) => {
        return hover && isValid(hover) ? hover : undefined;
      },
      (err) => {
        onUnexpectedExternalError(err);
        return undefined;
      },
    );
  });
  return Promise.all(promises).then(coalesce);
}
registerModelAndPositionCommand(
  "_executeHoverProvider",
  (model, position) => getHover(model, position, CancellationToken.None),
);
function isValid(result) {
  const hasRange = (typeof result.range !== "undefined");
  const hasHtmlContent = typeof result.contents !== "undefined" &&
    result.contents && result.contents.length > 0;
  return hasRange && hasHtmlContent;
}
