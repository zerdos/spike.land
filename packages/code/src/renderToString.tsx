import ErrorBoundary from "./components/ErrorBoundary";
import { renderToString } from "./reactDomServer";

export const toString = (App: React.FC) => renderToString(<ErrorBoundary><App /></ErrorBoundary>);
