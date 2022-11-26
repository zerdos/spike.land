import anyTest, { TestInterface } from "ava";
import { HTMLModElement } from "../../worker-thread/dom/HTMLModElement";
import { createTestingDocument } from "../DocumentCreation";
import { testReflectedProperties } from "../reflectPropertiesHelper";

const test = anyTest as TestInterface<{
  element: HTMLModElement;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();

  t.context = {
    element: document.createElement("del") as HTMLModElement,
  };
});

testReflectedProperties([{ cite: [""] }, { datetime: [""] }]);
