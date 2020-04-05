import React, { useState } from "react";
import { css } from "emotion";
import { numberStorage } from "./storage";

const color = "yellow";

export const CounterButton: React.FC<{ label: string }> = ({ label }) => {
  const [counter, changecounter] = useState(0);

  React.useEffect(() => {
    console.log("use effect");
    const getStored = async () => {
      const storedValue = await numberStorage.get("counter");

      console.log(storedValue);

      if (storedValue) {
        changecounter(storedValue);
      }
    };
    getStored();
  }, []);

  const incraseCounter = () => {
    const newValue = counter + 1;
    numberStorage.set("counter", newValue);
    changecounter(newValue);
  };

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

      <button onClick={incraseCounter}>
        {" "}
        {label} {counter}
      </button>
    </div>
  );
};
