import { useState } from "react";
export const useBgColor = () => {
  const [bgColor, setBgColor] = useState([0, 0, 0, 0]);
  const rgba = (r, g, b, a) => `rgba(${r || 1}, ${g || 1}, ${b || 1}, ${a || 0.7})`;
  return { bgColor, setBgColor, rgba };
};
