const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: {
    app: ["./src/main.js"],
  },
  output: {
    filename: "[name].js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".jsx", "tsx", ".ts", ".js", ".scss"],
    alias: {
      src: path.join(__dirname, "/src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        exclude: [/(node_modules)/],
      },
      // {
      //   test: /\.(jpg|jpeg|gif|png)$/,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 512000,
      //         name: "static/images/[name].[hash:8].[ext]",
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(eot|ttf|woff|woff2|svg)$/,
      //   use: "file-loader?name=fonts/[name].[hash:8].[ext]",
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks: ["app"],
      filename: "index.html",
    }),
  ],
};
