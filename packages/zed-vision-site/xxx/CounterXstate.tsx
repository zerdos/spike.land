import * as React from "react";
import { useMachine } from "@xstate/react";
import { assign, Machine } from "xstate";

const counterMachine = Machine({
  initial: "active",
  context: {
    count: 0,
  },
  states: {
    active: {
      on: {
        "-": {
          actions: assign({ count: ((x: { count: number }) => x.count - 1) }),
        },
        "+": {
          actions: assign({ count: ((x: { count: number }) => x.count + 1) }),
        },
      },
    },
  },
});

interface Props {
  events?: string[];
  onEvent?: (str: string) => void;
}

export const Counter: React.FC<Props> = (
  { events = ["reset"], onEvent },
) => {
  const [{ context }, send] = useMachine(counterMachine);

  return <div>
    <button onClick={() => send("-")}>-</button>
    {context.count}
    <button onClick={() => send("+")}>+</button>
  </div>;
};
