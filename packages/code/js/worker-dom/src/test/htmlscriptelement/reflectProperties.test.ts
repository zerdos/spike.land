import anyTest, { TestInterface } from "ava";
import { HTMLScriptElement } from "../../worker-thread/dom/HTMLScriptElement";
import { createTestingDocument } from "../DocumentCreation";
import { testReflectedProperties } from "../reflectPropertiesHelper";

const test = anyTest as TestInterface<{
  element: HTMLScriptElement;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();

  t.context = {
    element: document.createElement("script") as HTMLScriptElement,
  };
});

testReflectedProperties([
  { type: [""] },
  { src: [""] },
  { charset: [""] },
  { async: [false] },
  { defer: [false] },
  { crossOrigin: [""] },
  { noModule: [false] },
]);
