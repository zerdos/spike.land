import anyTest, { TestInterface } from "ava";
import { HTMLAnchorElement } from "../../worker-thread/dom/HTMLAnchorElement";
import { createTestingDocument } from "../DocumentCreation";
import { testReflectedProperties } from "../reflectPropertiesHelper";

const test = anyTest as TestInterface<{
  element: HTMLAnchorElement;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();

  t.context = {
    element: document.createElement("a") as HTMLAnchorElement,
  };
});

testReflectedProperties([{ href: [""] }, { hreflang: [""] }, { media: [""] }, {
  target: [""],
}, { type: [""] }]);
