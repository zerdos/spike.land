import anyTest, { TestInterface } from "ava";
import { HTMLOListElement } from "../../worker-thread/dom/HTMLOListElement";
import { createTestingDocument } from "../DocumentCreation";
import { testReflectedProperties } from "../reflectPropertiesHelper";

const test = anyTest as TestInterface<{
  element: HTMLOListElement;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();

  t.context = {
    element: document.createElement("ol") as HTMLOListElement,
  };
});

testReflectedProperties([{ reversed: [false] }, { start: [1] }, { type: [""] }]);
