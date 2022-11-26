import anyTest, { TestInterface } from "ava";
import { HTMLDataElement } from "../../worker-thread/dom/HTMLDataElement";
import { createTestingDocument } from "../DocumentCreation";
import { testReflectedProperty } from "../reflectPropertiesHelper";

const test = anyTest as TestInterface<{
  element: HTMLDataElement;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();

  t.context = {
    element: document.createElement("data") as HTMLDataElement,
  };
});

testReflectedProperty({ value: [""] });
