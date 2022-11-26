import anyTest, { TestInterface } from "ava";
import { HTMLTimeElement } from "../../worker-thread/dom/HTMLTimeElement";
import { createTestingDocument } from "../DocumentCreation";
import { testReflectedProperties } from "../reflectPropertiesHelper";

const test = anyTest as TestInterface<{
  element: HTMLTimeElement;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();

  t.context = {
    element: document.createElement("time") as HTMLTimeElement,
  };
});

testReflectedProperties([{ dateTime: [""] }]);
