import anyTest, { TestInterface } from "ava";
import { HTMLLinkElement } from "../../worker-thread/dom/HTMLLinkElement";
import { createTestingDocument } from "../DocumentCreation";
import { testReflectedProperties } from "../reflectPropertiesHelper";

const test = anyTest as TestInterface<{
  element: HTMLLinkElement;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();

  t.context = {
    element: document.createElement("link") as HTMLLinkElement,
  };
});

testReflectedProperties([
  { as: [""] },
  { crossOrigin: [""] },
  { disabled: [false] },
  { href: [""] },
  { hreflang: [""] },
  { media: [""] },
  { referrerPolicy: [""] },
  { sizes: [""] },
  { type: [""] },
]);
