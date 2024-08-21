export * as ReactDOM from "react-dom";
import reactDom from "react-dom";
export default reactDom;

export const createPortal: typeof reactDom.createPortal = ReactDOM.createPortal;
export const findDOMNode: typeof reactDom.findDOMNode = ReactDOM.findDOMNode;
export const flushSync: typeof reactDom.flushSync = ReactDOM.flushSync;
export const hydrate: reactDom.Renderer = ReactDOM.hydrate;
export const render: reactDom.Renderer = ReactDOM.render;
export const unmountComponentAtNode: typeof reactDom.unmountComponentAtNode = ReactDOM.unmountComponentAtNode;
export const unstable_batchedUpdates: typeof reactDom.unstable_batchedUpdates = ReactDOM.unstable_batchedUpdates;
export const unstable_renderSubtreeIntoContainer: typeof reactDom.unstable_renderSubtreeIntoContainer =
  ReactDOM.unstable_renderSubtreeIntoContainer;
export const version: string = ReactDOM.version;

// export default ReactDOM;
