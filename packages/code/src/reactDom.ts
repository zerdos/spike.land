import reactDomDefault from "react-dom";
import * as ReactDOM from "react-dom";

export const createPortal = ReactDOM.createPortal;
export const findDOMNode = ReactDOM.findDOMNode;
export const flushSync = ReactDOM.flushSync;
export const hydrate = ReactDOM.hydrate;
export const render = ReactDOM.render;
export const unmountComponentAtNode = ReactDOM.unmountComponentAtNode;
export const unstable_batchedUpdates = ReactDOM.unstable_batchedUpdates;
// export const unstable_renderSubtreeIntoContainer: typeof reactDom.unstable_renderSubtreeIntoContainer =
// ReactDOM.unstable_renderSubtreeIntoContainer;
export const version: string = ReactDOM.version;

// export default ReactDOM;
export default reactDomDefault;
