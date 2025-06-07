import { useDarkMode } from "@/hooks/use-dark-mode";
import { cn } from "@/lib/utils";
import { keyframes } from "@emotion/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(0.98); }
`;

const cornerRotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const moveToCorner = (point: string) => {
  const [x, y] = point.split(",").map(Number);
  return `translate(${(x ?? 0) - 50}px, ${(y ?? 0) - 50}px)`;
};

export const BackgroundEffect = ({ children }: { children: ReactNode; }) => {
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
      )}
    >
      <svg
        className={cn("absolute inset-0 w-full h-full z-0")}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{
          animation: `${pulse} 4s ease-in-out infinite`,
          filter: "blur(8px)",
          transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * 20}px, ${
            (mousePosition.y / window.innerHeight - 0.5) * 20
          }px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <defs>
          {[
            "0,0",
            "100,0",
            "0,100",
            "100,100",
            "50,0",
            "100,50",
            "50,100",
            "0,50",
          ].map(
            (point, index) => (
              <radialGradient
                key={index}
                id={`grad${index}`}
                cx={point.split(",")[0]}
                cy={point.split(",")[1]}
                r="100%"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0%"
                  stopColor={isDarkMode ? "#ff00ff" : "#ff8080"}
                  style={{
                    animation: `${pulse} ${3 + index}s ease-in-out infinite alternate`,
                  }}
                />
                <stop
                  offset="25%"
                  stopColor={isDarkMode ? "#8000ff" : "#ff8000"}
                />
                <stop
                  offset="50%"
                  stopColor={isDarkMode ? "#0080ff" : "#80ff00"}
                />
                <stop
                  offset="75%"
                  stopColor={isDarkMode ? "#00ffff" : "#0080ff"}
                  style={{
                    animation: `${pulse} ${4 + index}s ease-in-out infinite alternate-reverse`,
                  }}
                />
                <stop
                  offset="100%"
                  stopColor={isDarkMode ? "#000000" : "#ffffff"}
                  stopOpacity="0"
                />
              </radialGradient>
            ),
          )}
        </defs>
        {[
          "0,0",
          "100,0",
          "0,100",
          "100,100",
          "50,0",
          "100,50",
          "50,100",
          "0,50",
        ].map(
          (point, index) => (
            <g
              key={index}
              style={{
                transformOrigin: "50% 50%",
                animation: `${cornerRotate} ${20 + index * 3}s linear infinite${
                  index % 2 === 0 ? "" : " reverse"
                }`,
                transform: `${moveToCorner(point)} rotate(${
                  (mousePosition.x / window.innerWidth - 0.5) * 10
                }deg)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              {[...Array(72)].map((_, i) => (
                <path
                  key={i}
                  d={`M${point} L${
                    parseFloat(point.split(",")[0] ?? "0") +
                    60 * Math.cos((i * Math.PI) / 36)
                  },${
                    parseFloat(point.split(",")[1] ?? "0") +
                    60 * Math.sin((i * Math.PI) / 36)
                  }`}
                  stroke={`url(#grad${index % 4})`}
                  strokeWidth="0.3"
                  fill="none"
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
