import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import * as React from "react";
declare const NavigationMenu: React.ForwardRefExoticComponent<
  & Omit<NavigationMenuPrimitive.NavigationMenuProps & React.RefAttributes<HTMLElement>, "ref">
  & React.RefAttributes<HTMLElement>
>;
declare const NavigationMenuList: React.ForwardRefExoticComponent<
  & Omit<NavigationMenuPrimitive.NavigationMenuListProps & React.RefAttributes<HTMLUListElement>, "ref">
  & React.RefAttributes<HTMLUListElement>
>;
declare const NavigationMenuItem: React.ForwardRefExoticComponent<
  NavigationMenuPrimitive.NavigationMenuItemProps & React.RefAttributes<HTMLLIElement>
>;
declare const navigationMenuTriggerStyle: (
  props?: import("class-variance-authority/dist/types").ClassProp | undefined,
) => string;
declare const NavigationMenuTrigger: React.ForwardRefExoticComponent<
  & Omit<NavigationMenuPrimitive.NavigationMenuTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref">
  & React.RefAttributes<HTMLButtonElement>
>;
declare const NavigationMenuContent: React.ForwardRefExoticComponent<
  & Omit<NavigationMenuPrimitive.NavigationMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref">
  & React.RefAttributes<HTMLDivElement>
>;
declare const NavigationMenuLink: React.ForwardRefExoticComponent<
  NavigationMenuPrimitive.NavigationMenuLinkProps & React.RefAttributes<HTMLAnchorElement>
>;
declare const NavigationMenuViewport: React.ForwardRefExoticComponent<
  & Omit<NavigationMenuPrimitive.NavigationMenuViewportProps & React.RefAttributes<HTMLDivElement>, "ref">
  & React.RefAttributes<HTMLDivElement>
>;
declare const NavigationMenuIndicator: React.ForwardRefExoticComponent<
  & Omit<NavigationMenuPrimitive.NavigationMenuIndicatorProps & React.RefAttributes<HTMLDivElement>, "ref">
  & React.RefAttributes<HTMLDivElement>
>;
export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
};
