import * as ResizablePrimitive from "react-resizable-panels";
declare const ResizablePanelGroup: (
  { className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>,
) => import("@emotion/react/jsx-runtime").JSX.Element;
declare const ResizablePanel: import("react").ForwardRefExoticComponent<
  Omit<import("react").HTMLAttributes<keyof HTMLElementTagNameMap>, "id" | "onResize"> & {
    className?: string | undefined;
    collapsedSize?: number | undefined;
    collapsible?: boolean | undefined;
    defaultSize?: number | undefined;
    id?: string | undefined;
    maxSize?: number | undefined;
    minSize?: number | undefined;
    onCollapse?: ResizablePrimitive.PanelOnCollapse | undefined;
    onExpand?: ResizablePrimitive.PanelOnExpand | undefined;
    onResize?: ResizablePrimitive.PanelOnResize | undefined;
    order?: number | undefined;
    style?: object | undefined;
    tagName?: keyof HTMLElementTagNameMap | undefined;
  } & {
    children?: import("react").ReactNode;
  } & import("react").RefAttributes<ResizablePrimitive.ImperativePanelHandle>
>;
declare const ResizableHandle: (
  { withHandle, className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
    withHandle?: boolean;
  },
) => import("@emotion/react/jsx-runtime").JSX.Element;
export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
