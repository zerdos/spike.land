import { type VariantProps } from "class-variance-authority";
import * as React from "react";
declare const badgeVariants: (props?: ({
    variant?: "outline" | "default" | "destructive" | "secondary" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, ...props }: BadgeProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { Badge, badgeVariants };
