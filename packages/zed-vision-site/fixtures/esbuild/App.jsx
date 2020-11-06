import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePositionReorder } from "./use-position-reorder";
import { useMeasurePosition } from "./use-measure-position";
import "./styles.css";

/**
 * This is an example of drag-to-reorder in Framer Motion 2.
 *
 * By applying both drag and layout props to a component, if it changes place
 * in the DOM it'll either animate to its new position (if not dragging) or
 * stay stuck to the user's cursor (if dragging).
 */

export default function App() {
  const [order, updatePosition, updateOrder] = usePositionReorder(items);

  return (
    <ul>
      {order.map((height, i) => (
        <Item
          key={height}
          height={height}
          i={i}
          updatePosition={updatePosition}
          updateOrder={updateOrder}
        />
      ))}
    </ul>
  );
}

function Item({ i, height, updatePosition, updateOrder }) {
  const [isDragging, setDragging] = useState(false);

  const ref = useMeasurePosition((pos) => updatePosition(i, pos));

  return (
    <li
      style={{
        padding: 0,
        height,
        // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
        zIndex: isDragging ? 3 : 1,
      }}
    >
      <motion.div
        ref={ref}
        layout
        initial={false}
        style={{
          background: "white",
          height,
          borderRadius: 5,
        }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 3px 3px rgba(0,0,0,0.15)",
        }}
        whileTap={{
          scale: 1.12,
          boxShadow: "0px 5px 5px rgba(0,0,0,0.1)",
        }}
        drag="y"
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        onViewportBoxUpdate={(_viewportBox, delta) => {
          isDragging && updateOrder(i, delta.y.translate);
        }}
      />
    </li>
  );
}

const items = [60, 80, 70, 100];
