import anyTest, { TestInterface } from "ava";
import { HTMLEmbedElement } from "../../worker-thread/dom/HTMLEmbedElement";
import { createTestingDocument } from "../DocumentCreation";
import { testReflectedProperties } from "../reflectPropertiesHelper";

const test = anyTest as TestInterface<{
  element: HTMLEmbedElement;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();

  t.context = {
    element: document.createElement("embed") as HTMLEmbedElement,
  };
});

testReflectedProperties([{ height: [""] }, { src: [""] }, { type: [""] }, {
  width: [""],
}]);
