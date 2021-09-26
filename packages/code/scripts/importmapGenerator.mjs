import latestVersion from "latest-version";
import axios from "axios";
import path from "path";
// import { LoggerAdaptToConsole } from "console-log-json";
// LoggerAdaptToConsole();

const exceptions = {
    "scheduler/": "https://esm.sh/scheduler/",
    "hoist-non-react-statics": "https://esm.sh/hoist-non-react-statics",
    "prop-types": "https://esm.sh/prop-types",
    "react/jsx-runtime": "https://esm.sh/react/jsx-runtime",
    "react": "https://unpkg.com/@zedvision/esm@14.4.10/dist/react.mjs",
    "react-dom": "https://unpkg.com/@zedvision/esm@14.4.10/dist/react-dom.mjs",
    "react-is": "https://unpkg.com/@zedvision/esm@14.4.10/dist/react-is.mjs",
};


const getUnpkgLink = async (packageName) => {

  if (exceptions[packageName]) return [{[packageName]: exceptions[packageName]}];

  const latestPackageVersion = await latestVersion(packageName);
  // console.log(
  //   `https://unpkg.com/${packageName}@${latestPackageVersion}/package.json`,
  // );
  const packageJson = await axios.get(
    `https://unpkg.com/${packageName}@${latestPackageVersion}/package.json`,
  );

  const browserPath = packageJson.data.browser;

  const browserFiles = browserPath ? Object.keys(browserPath) : [];

  const getBrowserFile = (file) =>
    browserFiles.find((browserFile) => browserFile.includes(file)) || file;

  const mainPath = packageJson.data.main;
  const modulePath = packageJson.data.module;

  if (
    mainPath &&
    !(modulePath ||
      typeof (modulePath) === "string" && !modulePath.incudes("esm"))
  ) {
    return [{
      [packageName]: new URL(
        path.join(
          `${packageName}@${latestPackageVersion}`,
          `${getBrowserFile(mainPath)}`,
        ),
        `https://unpkg.com/`,
      ).href,
    }];
  }

  if (modulePath) {
    return [{
      [packageName]: new URL(
        path.join(
          `${packageName}@${latestPackageVersion}`,
          `${getBrowserFile(modulePath)}`,
        ),
        `https://unpkg.com/`,
      ).href,
    }];
  }

  const exp = packageJson.data.exports;

  if (!exp) return packageJson.data;
  const ret = [];

  const list = Object.keys(exp).map((p) => {
    if (Array.isArray(exp[p])) {
      if (exp[p][0].import) {
        ret.push({
          [path.join(packageName, p)]: new URL(
            path.join(
              `${packageName}@${latestPackageVersion}`,
              exp[p][0].import,
            ),
            `https://unpkg.com/`,
          ).href,
        });      
      }
    }
  });

  return ret;

  // if (mainPath) return  {[packageName]:`https://unpkg.com/${packageName}@${latestPackageVersion}/${modulePath}` }

  // return `https://unpkg.com/${packageName}@${latestPackageVersion}`;
};



const list = [
    "@babel/runtime",
    // "@emotion/cache",
    // "@emotion/hash",
    // "@emotion/is-prop-valid",
    // "@emotion/memoize",
    // "@emotion/react",
    // "@emotion/serialize",
    // "@emotion/sheet",
    // "@emotion/styled",
    // "@emotion/utils",
    // "@emotion/weak-memoize",
    // "@material-ui/core",
    // "@material-ui/private-theming",
    // "@material-ui/styled-engine",
    // "@material-ui/system",
    // "@material-ui/unstyled",
    // "@material-ui/utils",
    // "@popperjs/core",
    // "scheduler",
    // "clsx",
    // "framer-motion",
    // "css-vendor",
    //  "dom-helpers",
    //     "framer-motion",
    //     "framesync",
    //     "hey-listen",
    //     "hoist-non-react-statics",
    //     "hyphenate-style-name",
    //     "is-in-browser",
    //     "jss",
    //     "jss-plugin-camel-case",
    //     "jss-plugin-default-unit",
    //     "jss-plugin-global",
    //     "jss-plugin-nested",
    //     "jss-plugin-props-sort",
    //     "jss-plugin-rule-value-function",
    //     "jss-plugin-vendor-prefixer",
    //     "popmotion",
    //     "prop-types",
    //     "react",
    //     "react-dom",
    //     "react-is",
    //     "react-transition-group",
    //     "react/jsx-runtime",
    //     "@zedvision/renderer",
    //     "style-value-types",
    //     "stylis",
    //     "@zedvision/qrious",
    //     "tiny-warning",
    //     "tslib",
    //     "@zedvision/smart-monaco-editor",
    //     "simple-window-manager",
    //     "uuid",
    //     "@zedvision/shadb",
    //     "comlink",
    //     "@zedvision/ipfs",
    //     "workbox-window"
    
  ];
  
// console.log(await getUnpkgLink("@babel/runtime"))

const bigMap = await Promise.all(
  list.map((packageName) => getUnpkgLink(packageName)),
);

const importMap = { "imports": {} };
const flat = bigMap.flatMap((v) => v);
flat.map((i) => Object.assign(importMap.imports, i));
console.log(JSON.stringify(importMap, undefined, 2));

// console.log(Object.keys(list))
// await Promise.all(Object.keys(list).map(async (packageName) => {
//     const latestPackageVersion = await latestVersion(packageName);
//     const paths = Object.keys(list[packageName])
//     paths.map(p=> {
//         Object.assign(importMap.imports, {[packageName + p]: `https://unpkg.com/${packageName}@${latestPackageVersion}${list[packageName][p]}`});
//     });
//     console.log(paths);
//     console.log(latestPackageVersion);

// }));

// console.log(importMap);
