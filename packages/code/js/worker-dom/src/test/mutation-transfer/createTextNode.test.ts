import anyTest, { TestInterface } from "ava";
import { MutationFromWorker } from "../../transfer/Messages";
import { TransferrableKeys } from "../../transfer/TransferrableKeys";
import { NodeType } from "../../transfer/TransferrableNodes";
import { Document } from "../../worker-thread/dom/Document";
import { createTestingDocument } from "../DocumentCreation";
import { Emitter, emitter } from "../Emitter";

const test = anyTest as TestInterface<{
  document: Document;
  emitter: Emitter;
}>;

test.beforeEach((t) => {
  const document = createTestingDocument();

  t.context = {
    document,
    emitter: emitter(document),
  };
});

test.serial.cb("document.createTextNode creation format is valid", (t) => {
  const { document, emitter } = t.context;
  const text = document.createTextNode("text");

  function transmitted(strings: Array<string>, message: MutationFromWorker, buffers: Array<ArrayBuffer>) {
    t.deepEqual(
      Array.from(new Uint16Array(message[TransferrableKeys.nodes])),
      [text[TransferrableKeys.index], NodeType.TEXT_NODE, strings.indexOf("#text"), strings.indexOf("text"), 0],
      "creation format is as expected",
    );
    t.end();
  }

  Promise.resolve().then(() => {
    emitter.once(transmitted);
    document.body.appendChild(text);
  });
});
