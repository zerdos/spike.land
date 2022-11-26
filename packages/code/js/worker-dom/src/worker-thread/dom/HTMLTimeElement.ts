// <blockquote> and <q>

import { registerSubclass } from "./Element";
import { reflectProperties } from "./enhanceElement";
import { HTMLElement } from "./HTMLElement";

export class HTMLTimeElement extends HTMLElement {}
registerSubclass("time", HTMLTimeElement);

// Reflected Properties
// HTMLTimeElement.dateTime => string, reflected attribute
reflectProperties([{ dateTime: [""] }], HTMLTimeElement);
