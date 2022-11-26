import anyTest, { TestInterface } from "ava";
import { HTMLButtonElement } from "../../worker-thread/dom/HTMLButtonElement";
import { createTestingDocument } from "../DocumentCreation";
import { testReflectedProperty } from "../reflectPropertiesHelper";

const test = anyTest as TestInterface<{
  element: HTMLButtonElement;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();

  t.context = {
    element: document.createElement("button") as HTMLButtonElement,
  };
});

testReflectedProperty({ disabled: [false] });
testReflectedProperty({ formAction: [""] }, "hello");
testReflectedProperty({ formEnctype: [""] });
testReflectedProperty({ formMethod: [""] });
testReflectedProperty({ formTarget: [""] });
testReflectedProperty({ name: [""] });
testReflectedProperty({ type: ["submit"] });
testReflectedProperty({ value: [""] });
testReflectedProperty({ autofocus: [false] });
