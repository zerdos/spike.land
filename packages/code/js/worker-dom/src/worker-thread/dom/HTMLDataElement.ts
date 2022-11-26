import { registerSubclass } from "./Element";
import { reflectProperties } from "./enhanceElement";
import { HTMLElement } from "./HTMLElement";

export class HTMLDataElement extends HTMLElement {}
registerSubclass("data", HTMLDataElement);

// Reflected properties, strings.
// HTMLEmbedElement.value => string, reflected attribute
reflectProperties([{ value: [""] }], HTMLDataElement);
