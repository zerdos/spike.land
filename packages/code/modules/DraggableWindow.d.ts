/** @jsx jsx */
/// <reference types="react" />
import { React } from "./renderer";
interface DraggableWindowProps {
    onShare: () => void;
    onRestore: () => void;
    session: {
        url: string;
        errorText: string;
    };
    position?: string;
}
export declare const DraggableWindow: React.FC<DraggableWindowProps>;
interface IRenderProps extends DraggableWindowProps {
    children: React.ReactNode;
}
export declare const renderDraggableWindow: (props: IRenderProps, element: HTMLElement) => () => boolean;
export {};
