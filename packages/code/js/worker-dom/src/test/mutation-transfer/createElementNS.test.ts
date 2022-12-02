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

test.serial.cb("document.createElementNS creation format is valid", (t) => {
  const { document, emitter } = t.context;
  const svg = document.createElement("svg");

  function transmitted(
    strings: Array<string>,
    message: MutationFromWorker,
    buffers: Array<ArrayBuffer>,
  ) {
    t.deepEqual(
      Array.from(new Uint16Array(message[TransferrableKeys.nodes])),
      [
        svg[TransferrableKeys.index],
        NodeType.ELEMENT_NODE,
        strings.indexOf(svg.localName),
        0,
        strings.indexOf(svg.namespaceURI),
      ],
      "creation format is as expected",
    );
    t.end();
  }

  Promise.resolve().then(() => {
    emitter.once(transmitted);
    document.body.appendChild(svg);
  });
});
