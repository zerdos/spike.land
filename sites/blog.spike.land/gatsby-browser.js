// exports.disableCorePrefetching = () => true;

// const gatsbyBrowser = {
//   initialPath: "index.html",
//   notNavigated: true,
// };

// exports.onRouteUpdate = ({ location }) => {
//   if (gatsbyBrowser.initialPath !== location.pathname) {
//     gatsbyBrowser.notNavigated = false;
//     return;
//   }
//   gatsbyBrowser.initialPath = location.pathname;
// };

// exports.onPrefetchPathname = () => {
//   if (process.env.NODE_ENV !== `production`) return;
// };

// custom typefaces
import "typeface-montserrat";
import "typeface-merriweather";
// normalize CSS across browsers

// custom CSS styles
import "./src/style.css";

// Highlighting for code blocks
//import "prismjs/themes/prism.css";

import "normalize.css";
