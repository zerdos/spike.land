import * as React from "react";
import ReactDOM from "react-dom";

const Counter: React.FC<{ initial?: number }> = (
  { initial = 0 },
) => {
  const [clicks, setClicks] = React.useState(initial);

  return <div>
    <p>Clicks: {clicks}</p>
    <button onClick={() => setClicks(clicks + 1)}>+</button>
    <button onClick={() => setClicks(clicks - 1)}>-</button>
  </div>;
};

const elementToRender = document.getElementById("root");
ReactDOM.render(<Counter />, elementToRender);
