import anyTest, { TestInterface } from "ava";
import { HTMLMapElement } from "../../worker-thread/dom/HTMLMapElement";
import { createTestingDocument } from "../DocumentCreation";
import { testReflectedProperties } from "../reflectPropertiesHelper";

const test = anyTest as TestInterface<{
  element: HTMLMapElement;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();

  t.context = {
    element: document.createElement("map") as HTMLMapElement,
  };
});

testReflectedProperties([{ name: [""] }]);
