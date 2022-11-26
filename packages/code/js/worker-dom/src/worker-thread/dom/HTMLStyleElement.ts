import { registerSubclass } from "./Element";
import { reflectProperties } from "./enhanceElement";
import { HTMLElement } from "./HTMLElement";

export class HTMLStyleElement extends HTMLElement {}
registerSubclass("style", HTMLStyleElement);

// Reflected Properties
// HTMLStyleElement.media => string, reflected attribute
// HTMLStyleElement.type => string, reflected attribute
reflectProperties([{ media: [""] }, { type: [""] }], HTMLStyleElement);

// Unimplemented Properties
// HTMLStyleElement.disabled => boolean
// HTMLStyleElement.scoped => boolean, reflected attribute
// HTMLStyleElement.sheet => StyleSheet, read only
