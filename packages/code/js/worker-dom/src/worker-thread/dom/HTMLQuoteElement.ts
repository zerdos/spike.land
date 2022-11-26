import { registerSubclass } from "./Element";
import { reflectProperties } from "./enhanceElement";
import { HTMLElement } from "./HTMLElement";

export class HTMLQuoteElement extends HTMLElement {}
registerSubclass("blockquote", HTMLQuoteElement);
registerSubclass("q", HTMLQuoteElement);

// Reflected Properties
// HTMLModElement.cite => string, reflected attribute
reflectProperties([{ cite: [""] }], HTMLQuoteElement);
