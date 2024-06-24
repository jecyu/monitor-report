const merge = require("webpack-merge");
const path = require("path");
const webpackConfigBase = require("./webpack.config.base");

const devConfig = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  devtool: "source-map",
};

module.exports = merge(webpackConfigBase, devConfig);
