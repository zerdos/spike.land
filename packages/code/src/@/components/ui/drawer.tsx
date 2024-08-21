import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer: {
  (
    { shouldScaleBackground, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>,
  ): import("@emotion/react/jsx-runtime").JSX.Element;
  displayName: string;
} = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger: React.ForwardRefExoticComponent<
  import("@radix-ui/react-dialog").DialogTriggerProps & React.RefAttributes<HTMLButtonElement>
> = DrawerPrimitive.Trigger;

const DrawerPortal: React.FC<import("@radix-ui/react-dialog").DialogPortalProps> = DrawerPrimitive.Portal;

const DrawerClose: React.ForwardRefExoticComponent<
  import("@radix-ui/react-dialog").DialogCloseProps & React.RefAttributes<HTMLButtonElement>
> = DrawerPrimitive.Close;

const DrawerOverlay: React.ForwardRefExoticComponent<
  Omit<
    & Omit<import("@radix-ui/react-dialog").DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref">
    & React.RefAttributes<HTMLDivElement>,
    "ref"
  > & React.RefAttributes<HTMLDivElement>
> = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent: React.ForwardRefExoticComponent<
  Omit<
    Omit<import("@radix-ui/react-dialog").DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
      onAnimationEnd?: (open: boolean) => void;
    } & React.RefAttributes<HTMLDivElement>,
    "ref"
  > & React.RefAttributes<HTMLDivElement>
> = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader: {
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("@emotion/react/jsx-runtime").JSX.Element;
  displayName: string;
} = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter: {
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("@emotion/react/jsx-runtime").JSX.Element;
  displayName: string;
} = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle: React.ForwardRefExoticComponent<
  & Omit<import("@radix-ui/react-dialog").DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref">
  & React.RefAttributes<HTMLHeadingElement>
> = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription: React.ForwardRefExoticComponent<
  & Omit<import("@radix-ui/react-dialog").DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref">
  & React.RefAttributes<HTMLParagraphElement>
> = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
