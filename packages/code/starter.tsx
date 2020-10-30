import * as React from "react";
import ReactDOM from "react-dom";

const Counter = (
    { initial = 0 }
) => {
    const [clicks, setClicks] = React.useState(initial);

    return <div>
        <p>Clicks: <strong>{clicks}</strong></p>
        <button onClick={() => setClicks(clicks + 1)}>+</button>
        <button onClick={() => setClicks(clicks - 1)}>-</button>
    </div>;
};

ReactDOM.render(
    <Counter initial={0} />,
    document.getElementById("root")
);

