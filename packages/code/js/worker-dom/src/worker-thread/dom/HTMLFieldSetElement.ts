import { toLower } from "../../utils";
import { registerSubclass } from "./Element";
import { reflectProperties } from "./enhanceElement";
import { HTMLElement } from "./HTMLElement";
import { HTMLFormControlsCollectionMixin } from "./HTMLFormControlsMixin";

export class HTMLFieldSetElement extends HTMLElement {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFieldSetElement
   * @return hardcoded string 'fieldset'
   */
  get type(): string {
    return toLower(this.tagName);
  }
}
registerSubclass("fieldset", HTMLFieldSetElement);
HTMLFormControlsCollectionMixin(HTMLFieldSetElement);

// Reflected properties
// HTMLFieldSetElement.name => string, reflected attribute
// HTMLFieldSetElement.disabled => boolean, reflected attribute
reflectProperties([{ name: [""] }, { disabled: [false] }], HTMLFieldSetElement);

// Unimplemented properties
// HTMLFieldSetElement.validity
// HTMLFieldSetElement.willValidate
// HTMLFieldSetElement.validationMessage
