const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  devtool:
    process.env.NODE_ENV === "production" ? false : "eval-cheap-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./client"),
      publicPath: "./",
    },
    proxy: [
      {
        context: ["/corsproxy", "/login", "/signup", "/mainPage"],
        target: "http://localhost:3000",
        // secure: false,
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "./client/index.html"),
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"], ["@babel/preset-react"]],
          },
        },
      },
      {
        test: /\css?$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
