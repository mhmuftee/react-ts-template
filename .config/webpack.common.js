const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const DotenvWebpackPlugin = require("dotenv-webpack")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const config = {
  entry: ["./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"]
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: './public/logo512.png',
      mode: 'webapp',
      manifest: './public/manifest.json'
    }),
    new HtmlWebpackPlugin({
      appMountId: "app",
      template: "./src/index.html",
      inject: "body",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new DotenvWebpackPlugin({
      path: ".config/.env",
    }),
  ],
}

module.exports = config
