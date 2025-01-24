import { badgeVariants } from "@/components/ui/badge-variants";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants>
{}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
