import webpackPreprocessor from "@cypress/webpack-preprocessor";

// should we just reuse root webpack config?
const webpackOptions = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
        },
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: ["style-loader", "css-loader"],
      },
      {
        // some of our examples import SVG
        test: /\.svg$/,
        loader: "svg-url-loader",
      },
    ],
  },
};

const options = {
  // send in the options from your webpack.config.js, so it works the same
  // as your app's code
  webpackOptions,
  watchOptions: {},
};

export default (on, config) => {
  on("file:preprocessor", webpackPreprocessor(options));

  // initPlugin(on, config)
  return config;
};
