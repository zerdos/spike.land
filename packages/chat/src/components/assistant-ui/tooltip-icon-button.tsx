import * as React from "react";
import { cn } from "../../lib/utils";
import { Button, type ButtonProps } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export interface TooltipIconButtonProps extends ButtonProps {
  tooltip?: string;
  side?: "top" | "bottom" | "left" | "right";
  delayDuration?: number;
}

export const TooltipIconButton = React.forwardRef<
  HTMLButtonElement,
  TooltipIconButtonProps
>(({ tooltip, side = "top", delayDuration = 0, className, children, ...props }, ref) => {
  if (!tooltip) {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8", className)}
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", className)}
            {...props}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

TooltipIconButton.displayName = "TooltipIconButton";
