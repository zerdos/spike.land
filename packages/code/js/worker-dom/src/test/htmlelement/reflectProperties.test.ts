import anyTest, { TestInterface } from "ava";
import { HTMLElement } from "../../worker-thread/dom/HTMLElement";
import { createTestingDocument } from "../DocumentCreation";
import { testReflectedProperties } from "../reflectPropertiesHelper";

const test = anyTest as TestInterface<{
  element: HTMLElement;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();

  t.context = {
    element: document.createElement("div") as HTMLElement,
  };
});

testReflectedProperties([
  { accessKey: [""] },
  { contentEditable: ["inherit"] },
  { dir: [""] },
  { lang: [""] },
  { title: [""] },
  { draggable: [false] },
  { hidden: [false] },
  { noModule: [false] },
  {
    spellcheck: [true, /* attr */ undefined, /* keywords */ ["true", "false"]],
  },
  { translate: [true, /* attr */ undefined, /* keywords */ ["yes", "no"]] },
]);
