import anyTest, { TestInterface } from "ava";
import { TransferrableKeys } from "../../transfer/TransferrableKeys";
import { TransferrableMutationType } from "../../transfer/TransferrableMutation";
import { Document } from "../../worker-thread/dom/Document";
import { Element } from "../../worker-thread/dom/Element";
import { createTestingDocument } from "../DocumentCreation";
import { expectMutations } from "../Emitter";

const test = anyTest as TestInterface<{
  document: Document;
  element: Element;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();
  const element = document.createElement("div");

  t.context = {
    document,
    element,
  };
});

test.serial.cb("Element.scrollIntoView() transfer to main-thread", (t) => {
  const { document, element } = t.context;
  element.isConnected = true;

  expectMutations(document, (mutations) => {
    t.deepEqual(mutations, [
      TransferrableMutationType.SCROLL_INTO_VIEW,
      element[TransferrableKeys.index],
    ]);
    t.end();
  });

  element.scrollIntoView();
});
