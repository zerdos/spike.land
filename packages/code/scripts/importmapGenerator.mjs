import latestVersion from "latest-version";
import axios from "axios";
import path from "path";
// import { LoggerAdaptToConsole } from "console-log-json";
// LoggerAdaptToConsole();

const zedEsmLatestVersion = await latestVersion("@spike.land/esm");
const uidVersion = await latestVersion("uuid");
// const muiMateriaVersion = await latestVersion("@mui/material");
// const muiCoreVersion = await latestVersion("@mui/core");

const exceptions = {
  "scheduler/": "https://esm.sh/scheduler/",
  "react-transition-group": "https://esm.sh/react-transition-group",
  "hoist-non-react-statics": "https://esm.sh/hoist-non-react-statics",
  "prop-types": "https://esm.sh/prop-types",
  "@babel/runtime/helpers/esm/extends": "https://ga.jspm.io/npm:@babel/runtime@7.16.5/helpers/esm/extends.js",
  "@babel/runtime/helpers/extends": "https://ga.jspm.io/npm:@babel/runtime@7.16.5/helpers/esm/extends.js",
  "@emotion/react":
  {
    "@babel/runtime/helpers/esm/extends": "https://ga.jspm.io/npm:@babel/runtime@7.16.5/helpers/esm/extends.js",
    "@babel/runtime/helpers/extends": "https://ga.jspm.io/npm:@babel/runtime@7.16.5/helpers/esm/extends.js",
    "@emotion/cache": "https://ga.jspm.io/npm:@emotion/cache@11.7.1/dist/emotion-cache.browser.esm.js",
    "@emotion/hash": "https://ga.jspm.io/npm:@emotion/hash@0.8.0/dist/hash.browser.esm.js",
    "@emotion/memoize": "https://ga.jspm.io/npm:@emotion/memoize@0.7.5/dist/emotion-memoize.browser.esm.js",
    "@emotion/serialize": "https://ga.jspm.io/npm:@emotion/serialize@1.0.2/dist/emotion-serialize.browser.esm.js",
    "@emotion/sheet": "https://ga.jspm.io/npm:@emotion/sheet@1.1.0/dist/emotion-sheet.browser.esm.js",
    "@emotion/unitless": "https://ga.jspm.io/npm:@emotion/unitless@0.7.5/dist/unitless.browser.esm.js",
    "@emotion/utils": "https://ga.jspm.io/npm:@emotion/utils@1.0.0/dist/emotion-utils.browser.esm.js",
    "@emotion/weak-memoize": "https://ga.jspm.io/npm:@emotion/weak-memoize@0.2.5/dist/weak-memoize.browser.esm.js",
    "hoist-non-react-statics": "https://ga.jspm.io/npm:hoist-non-react-statics@3.3.2/dist/hoist-non-react-statics.cjs.js",
    "object-assign": "https://ga.jspm.io/npm:object-assign@4.1.1/index.js",
    "react": "https://ga.jspm.io/npm:react@17.0.2/index.js",
    "react-is": "https://ga.jspm.io/npm:react-is@16.13.1/index.js",
    "stylis": "https://ga.jspm.io/npm:stylis@4.0.13/index.js",
    "@emotion/react": "https://ga.jspm.io/npm:@emotion/react@11.7.1/dist/emotion-react.browser.esm.js"},
  // "@mui/material": `https://unpkg.com/@mui/material@${muiMateriaVersion}/modern/index.js`,
  // "@mui/material/": `https://unpkg.com/@mui/material@${muiMateriaVersion}/modern/`,
  // "@mui/core": `https://unpkg.com/@mui/core@${muiCoreVersion}/modern/index.js`,
  // "@mui/core/": `https://unpkg.com/@mui/core@${muiCoreVersion}/modern/`,

  // "@mui/core/": `https://unpkg.com/@mui/material@${muiMateriaVersion}/modern/`,
  "react/jsx-runtime": "https://esm.sh/react/jsx-runtime",
  "object-assign": "https://ga.jspm.io/npm:object-assign@4.1.1/index.js",
  "scheduler": "https://ga.jspm.io/npm:scheduler@0.20.2/index.js",

  "react": `https://ga.jspm.io/npm:react@17.0.2/index.js`,
  "react-dom": `https://ga.jspm.io/npm:react-dom@17.0.2/index.js`,
  "react-is": `https://ga.jspm.io/npm:react-is@17.0.2/index.js`,

  "framer-motion":
    `https://unpkg.com/@spike.land/esm@${zedEsmLatestVersion}/dist/framer-motion.mjs`,

  "ipfs-only-hash":
    `https://unpkg.com/@spike.land/esm@${zedEsmLatestVersion}/dist/ipfs-only-hash.mjs`,

  "textdiff-create":
    `https://unpkg.com/@spike.land/esm@${zedEsmLatestVersion}/dist/textdiff-create.mjs`,
  "textdiff-patch":
    `https://unpkg.com/@spike.land/esm@${zedEsmLatestVersion}/dist/textdiff-patch.mjs`,
    "uuid": `https://ga.jspm.io/npm:uuid@${uidVersion}/dist/esm-browser/index.js`};

const getUnpkgLink = async (packageName) => {
  if (exceptions[packageName]) {
    return [{ [packageName]: exceptions[packageName] }];
  }

  const latestPackageVersion = await latestVersion(packageName);
  // console.log(
  //   `https://unpkg.com/${packageName}@${latestPackageVersion}/package.json`,
  // );
  const packageJson = await axios.get(
    `https://unpkg.com/${packageName}@${latestPackageVersion}/package.json`,
  );

  const browserPath = packageJson.data.browser;

  const browserFiles = browserPath ? Object.keys(browserPath) : [];

  const getBrowserFile = (file) => {
    const browserFile = browserFiles.find((browserFile) =>
      browserFile.includes(file)
    );
    if (browserFile) return browserPath[browserFile];
    return file;
  };

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

        ret.push({
          [
            path.join(
              packageName,
              path.parse(exp[p][0].import).dir,
              path.parse(exp[p][0].import).name,
            )
          ]: new URL(
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
  // "@babel/runtime/",
  "@babel/runtime/helpers/esm/extends",
  "@babel/runtime/helpers/extends",
  // "@emotion/cache",
  // "@emotion/hash",
  // "@emotion/is-prop-valid",
  // "@emotion/memoize",
  "@emotion/react",
  // "@emotion/serialize",
  // "@emotion/sheet",
  // "@emotion/styled",
  // "@emotion/utils",
  // "@emotion/unitless",
  // "@emotion/weak-memoize",
  // "@mui/material",
  // "@mui/core",
  // "@mui/system",
  // "@mui/styles",
  // "@mui/utils",
  "prop-types",
  "textdiff-create",
  "textdiff-patch",

  "framer-motion",
  // "clsx",

  "framesync",
  "scheduler",
  "object-assign",
  "hey-listen",
  "hoist-non-react-statics",
  "popmotion",
  "react",
  "react-dom",
  "react-is",
  "react-transition-group",
  "react/jsx-runtime",
  "@spike.land/renderer",
  "style-value-types",
  "stylis",
  "@spike.land/qrious",
  "tslib",
  "ipfs-only-hash",
  "uuid",
  "@spike.land/code",
  "@spike.land/smart-monaco-editor",
  "comlink",
  "@spike.land/ipfs",
  "workbox-window",
];

// console.log(await getUnpkgLink("@babel/runtime"))

const bigMap = await Promise.all(
  list.map((packageName) => getUnpkgLink(packageName)),
);



const importMap = { "imports": {} };
const flat = bigMap.flatMap((v) => v);
flat.map((i) => Object.assign(importMap.imports, i));


Object.keys(importMap.imports).map(key=> typeof importMap.imports[key] !=="string" && Object.keys(importMap.imports[key]).map(x=>importMap.imports[x]=importMap.imports[key][x]) );

importMap.imports.dev = "./js/starter.mjs";
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
