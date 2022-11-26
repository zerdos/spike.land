import anyTest, { TestInterface } from "ava";
import { HTMLMeterElement } from "../../worker-thread/dom/HTMLMeterElement";
import { createTestingDocument } from "../DocumentCreation";
import { testReflectedProperties } from "../reflectPropertiesHelper";

const test = anyTest as TestInterface<{
  element: HTMLMeterElement;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();

  t.context = {
    element: document.createElement("meter") as HTMLMeterElement,
  };
});

testReflectedProperties([{ high: [0] }, { low: [0] }, { max: [1] }, { min: [0] }, { optimum: [0] }, { value: [0] }]);
