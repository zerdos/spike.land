import anyTest, { TestInterface } from "ava";
import { HTMLStyleElement } from "../../worker-thread/dom/HTMLStyleElement";
import { createTestingDocument } from "../DocumentCreation";
import { testReflectedProperties } from "../reflectPropertiesHelper";

const test = anyTest as TestInterface<{
  element: HTMLStyleElement;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();

  t.context = {
    element: document.createElement("style") as HTMLStyleElement,
  };
});

testReflectedProperties([{ media: [""] }, { type: [""] }]);
