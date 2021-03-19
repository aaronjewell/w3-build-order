const { join } = require("path")
const Sass = require("sass")
const { fileURLToPath } = require("url")
const VueLoaderPlugin = require("vue-loader/lib/plugin.js")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin

module.exports = {
  entry: "./demo.js",
  output: {
    path: join(__dirname, "dist"),
    filename: "demo.js",
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: Sass,
            },
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin(), new BundleAnalyzerPlugin()],
  mode: "development",
}
