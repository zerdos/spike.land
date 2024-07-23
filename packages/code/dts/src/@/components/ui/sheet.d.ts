import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { type VariantProps } from "class-variance-authority";
declare const Sheet: any;
declare const SheetTrigger: any;
declare const SheetClose: any;
declare const SheetPortal: any;
declare const SheetOverlay: React.ForwardRefExoticComponent<any>;
declare const sheetVariants: (props?: ({
    side?: "left" | "top" | "right" | "bottom" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {
}
declare const SheetContent: React.ForwardRefExoticComponent<SheetContentProps & React.RefAttributes<any>>;
declare const SheetHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("@emotion/react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const SheetFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("@emotion/react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const SheetTitle: React.ForwardRefExoticComponent<any>;
declare const SheetDescription: React.ForwardRefExoticComponent<any>;
export { Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, };
