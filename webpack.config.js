const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizePlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  //js진입점을 나타냄
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    //생성경로
    clean: true,
    //생성경로의 다른 파일 존재시 클린후 재생성
  },
  //번들 파일 관련 속성
  devtool: "source-map",
  //빌드한 파일과  원본파일을 연결
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: "keyboard",
      template: "./index.html",
      inject: "body",
      //빌드했을때 js를 바디에 넣는다
      favicon: "./favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  devServer: {
    host: "localhost",
    port: 8080,
    open: true,
    watchFiles: "index.html",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizePlugin()],
  },
};
