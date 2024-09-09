import React, { useState, useEffect } from "react";
import { css, keyframes } from "@emotion/react";
import { cn } from "@/lib/utils";
import { useDarkMode } from "@/hooks/use-dark-mode";


const fadeIn = keyframes`
from { opacity: 0; transform: translateY(20px); }
to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
0%, 100% { opacity: 1; transform: scale(1); }
50% { opacity: 0.8; transform: scale(0.98); }
`;
const rotate = keyframes`
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
`;
const cornerRotate = keyframes`
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
`;
const moveToCorner = (point: string) => {
  const [x, y] = point.split(",").map(Number);
  return `translate(${x - 50}px, ${y - 50}px)`;
};
export const BackgroundEffect: React.FC<{children: React.ReactElement}> = ({children}) => {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDarkMode } = useDarkMode();
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden",
        isDarkMode ? "bg-black" : "bg-white",
      )}>
      <div
        className={cn(
          "absolute inset-0 opacity-50 z-10",
          isDarkMode ? "bg-black" : "bg-white",
        )}></div>
      <svg
        css={css`
                 animation: ${pulse} 4s ease-in-out infinite;
                 filter: blur(8px);
                 transform: translate(${(mousePosition.x / window.innerWidth - 0.5) * 20}px, ${(mousePosition.y / window.innerHeight - 0.5) * 20}px);
                 transition: transform 0.1s ease-out;
               `}
        className={cn("absolute inset-0 w-full h-full z-0")}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid slice'>
        <defs>
          {["0,0", "100,0", "0,100", "100,100", "50,0", "100,50", "50,100", "0,50"].map(
            (point, index) => (
              <radialGradient
                key={index}
                id={`grad${index}`}
                cx={point.split(",")[0]}
                cy={point.split(",")[1]}
                r='100%'
                gradientUnits='userSpaceOnUse'>
                <stop
                  offset='0%'
                  stopColor={isDarkMode ? "#ff00ff" : "#ff8080"}
                  css={css`
                        animation: ${pulse} ${3 + index}s ease-in-out infinite alternate;
                      `}
                />
                <stop
                  offset='25%'
                  stopColor={isDarkMode ? "#8000ff" : "#ff8000"}
                />
                <stop
                  offset='50%'
                  stopColor={isDarkMode ? "#0080ff" : "#80ff00"}
                />
                <stop
                  offset='75%'
                  stopColor={isDarkMode ? "#00ffff" : "#0080ff"}
                  css={css`
                           animation: ${pulse} ${4 + index}s ease-in-out infinite alternate-reverse;
                         `}
                />
                <stop
                  offset='100%'
                  stopColor={isDarkMode ? "#000000" : "#ffffff"}
                  stopOpacity='0'
                />
              </radialGradient>
            ),
          )}
        </defs>
        {["0,0", "100,0", "0,100", "100,100", "50,0", "100,50", "50,100", "0,50"].map(
          (point, index) => (
            <g
              key={index}
              css={css`
                       transform-origin: 50% 50%;
                       animation: ${cornerRotate} ${20 + index * 3}s linear infinite${index % 2 === 0 ? "" : " reverse"};
                       transform: ${moveToCorner(point)} rotate(${(mousePosition.x / window.innerWidth - 0.5) * 10}deg);
                       transition: transform 0.1s ease-out;
                     `}>
              {[...Array(72)].map((_, i) => (
                <path
                  key={i}
                  d={`M${point} L${parseFloat(point.split(",")[0]) + 60 * Math.cos((i * Math.PI) / 36)},${parseFloat(point.split(",")[1]) + 60 * Math.sin((i * Math.PI) / 36)}`}
                  stroke={`url(#grad${index % 4})`}
                  strokeWidth='0.3'
                  fill='none'
                />
              ))}
            </g>
          ),
        )}
      </svg>
      {children}
    </div>
  );
};
