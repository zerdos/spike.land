import { FC, useState } from "react";

export const Counter: FC<{ initial?: number }> = (
  { initial = 0 },
) => {
  const [clicks, setClicks] = useState(initial);

  return <div>e
    <p>Clicks: {clicks}</p>
    <button onClick={() => setClicks(clicks + 1)}>+</button>
    <button onClick={() => setClicks(clicks - 1)}>-</button>
  </div>;
};
