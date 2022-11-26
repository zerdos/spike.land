import { registerSubclass } from "./Element";
import { reflectProperties } from "./enhanceElement";
import { HTMLElement } from "./HTMLElement";

export class HTMLModElement extends HTMLElement {}
registerSubclass("del", HTMLModElement);
registerSubclass("ins", HTMLModElement);

// Reflected Properties
// HTMLModElement.cite => string, reflected attribute
// HTMLModElement.datetime => string, reflected attribute
reflectProperties([{ cite: [""] }, { datetime: [""] }], HTMLModElement);
