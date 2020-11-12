import { importScript } from "./importScript.ts";

export const makeDraggable = async () => {
  const onload = await importScript(
    "https://unpkg.com/interactjs@1.10.0/dist/interact.min.js",
  );

  const interact = window["interact"];
  interact(".draggable")
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
      // enable autoScroll
      autoScroll: false,
      listeners: {
        // call this function on every dragMove event
        move: dragMoveListener,
      },
    });
};

function dragMoveListener(event) {
  const target = event.target;

  // keep the dragged position in the data-x/data-y attributes
  const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform = "translate(" + x +
    "px, " + y + "px)";

  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}
