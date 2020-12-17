///<reference lib="dom"/>

interface CSSImportRule extends CSSRule {
  readonly href: string;
  readonly media: MediaList;
  readonly styleSheet: CSSStyleSheet;
}
