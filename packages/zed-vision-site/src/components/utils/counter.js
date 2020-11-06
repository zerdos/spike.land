const initialState = { counter: 0 };
const actions = {
  "reset": (s) => ({ ...s, counter: initialState.counter }),
  "+1": (s) => ({ ...s, counter: s.counter + 1 }),
  "-1": (s) => ({ ...s, counter: s.counter - 1 }),
};
const Counter = ({ events = ["reset"], onEvent }) => {
  const [pastEvents, setEvents] = React.useState(events);
  const calculatedState = pastEvents.reduce(
    (prevValue, currentValue) => actions[currentValue](prevValue),
    { counter: initialState.counter },
  );
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    /*#__PURE__*/ React.createElement("button", update("-1"), "-"),
    calculatedState.counter,
    /*#__PURE__*/ React.createElement("button", update("+1"), "+"),
  );
  function update(action) {
    return {
      "data-onclick": action,
      onClick: (ev) => {
        ev.stopPropagation();
        setEvents((e) => [...e, action]);
        if (onEvent) onEvent(action);
      },
    };
  }
};
