import { cn } from "@/lib/utils";
import * as React from "react";
import type { CSSProperties } from "react";

interface BrowserFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  description: string;
  isHovered: boolean;
}

const BrowserFrame = React.forwardRef<HTMLDivElement, BrowserFrameProps>(
  ({ children, name, description, isHovered, className, ...props }, ref) => {
    const style: CSSProperties = {
      transform: isHovered ? "translateY(0%)" : "translateY(100%)",
      opacity: isHovered ? 1 : 0,
      transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg overflow-hidden shadow-lg relative transition-all duration-500 w-full h-0 pb-[75%] bg-white bg-opacity-70 hover:bg-opacity-100",
          className,
        )}
        {...props}
      >
        <div className="bg-gray-100 p-2 flex items-center space-x-2">
          <div className="flex space-x-1">
            {["red", "yellow", "green"].map((color) => (
              <div
                key={color}
                className={`w-3 h-3 rounded-full bg-${color}-400`}
              />
            ))}
          </div>
          <div className="flex-grow bg-white rounded px-2 py-1 text-sm text-gray-600">
            {name}
          </div>
        </div>
        <div className="absolute top-[40px] left-0 right-0 bottom-0 bg-white overflow-hidden">
          <div className="w-[calc(100%+4px)] h-[calc(100%+4px)] -m-[2px]">
            {children}
          </div>
        </div>
        <div
          style={style}
          className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white text-sm p-3 text-center rounded-b-lg"
        >
          {description}
        </div>
      </div>
    );
  },
);

BrowserFrame.displayName = "BrowserFrame";

export { BrowserFrame };
