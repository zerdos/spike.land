import { registerSubclass } from "./Element";
import { reflectProperties } from "./enhanceElement";
import { HTMLElement } from "./HTMLElement";

export class HTMLTableColElement extends HTMLElement {}
registerSubclass("col", HTMLTableColElement);

// Reflected Properties
// HTMLTableColElement.span => number, reflected attribute
reflectProperties([{ span: [1] }], HTMLTableColElement);
