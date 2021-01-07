///<reference lib="dom"/>

interface CSSImportRule extends CSSRule {
  readonly href: string;
  readonly media: MediaList;
  readonly styleSheet: CSSStyleSheet;
}

declare const workbox: unknown;

declare const Babel: unknown;

declare module "https://unpkg.com/comlink@4.3.0/dist/esm/comlink.mjs";
declare module "https://unpkg.com/uuid@8.3.2/dist/esm-browser/v4.js";
