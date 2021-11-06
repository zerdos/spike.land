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
  // "@mui/material": `https://unpkg.com/@mui/material@${muiMateriaVersion}/modern/index.js`,
  // "@mui/material/": `https://unpkg.com/@mui/material@${muiMateriaVersion}/modern/`,
  // "@mui/core": `https://unpkg.com/@mui/core@${muiCoreVersion}/modern/index.js`,
  // "@mui/core/": `https://unpkg.com/@mui/core@${muiCoreVersion}/modern/`,

  // "@mui/core/": `https://unpkg.com/@mui/material@${muiMateriaVersion}/modern/`,
  "react/jsx-runtime": "https://esm.sh/react/jsx-runtime",
  "react":
    `https://unpkg.com/@spike.land/esm@${zedEsmLatestVersion}/dist/react.mjs`,
  "react-dom":
    `https://unpkg.com/@spike.land/esm@${zedEsmLatestVersion}/dist/react-dom.mjs`,
  "react-is":
    `https://unpkg.com/@spike.land/esm@${zedEsmLatestVersion}/dist/react-is.mjs`,
  "uuid/": `https://unpkg.com/uuid@${uidVersion}/dist/esm-browser/`,
};

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
  "@babel/runtime",
  "@emotion/cache",
  "@emotion/hash",
  "@emotion/is-prop-valid",
  "@emotion/memoize",
  "@emotion/react",
  "@emotion/serialize",
  "@emotion/sheet",
  "@emotion/styled",
  "@emotion/utils",
  "@emotion/unitless",
  "@emotion/weak-memoize",
  // "@mui/material",
  // "@mui/core",
  // "@mui/system",
  // "@mui/styles",
  // "@mui/utils",
  "prop-types",
  "framer-motion",
  // "clsx",
  "framesync",
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
  "@spike.land/smart-monaco-editor",
  "@zedvision/swm",
  "uuid/",
  "@spike.land/shadb",
  "@spike.land/code",
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
