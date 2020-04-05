import React, { useState } from "react";
import { css } from "emotion";

const color = "yellow";

export const CounterButton: React.FC<{ label: string }> = ({ label }) => {
  const [counter, changecounter] = useState(0);

  return (
    <div>
      <div
        className={css`
          padding: 32px;
          background-color: red;
          font-size: 24px;
          border-radius: 4px;
          &:hover {
            color: ${color};
          }
        `}
      >
        Hover to change color.
      </div>

      <button onClick={() => changecounter(counter + 1)}>
        {" "}
        {label + 7} {counter}
      </button>
    </div>
  );
};
