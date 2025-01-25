import { useState } from "react";

export const useBgColor = () => {
  const [bgColor, setBgColor] = useState<[number, number, number, number]>([
    0,
    0,
    0,
    0,
  ]);

  const rgba = (r: number, g: number, b: number, a: number) =>
    `rgba(${r || 1}, ${g || 1}, ${b || 1}, ${a || 0.7})`;

  return { bgColor, setBgColor, rgba };
};
