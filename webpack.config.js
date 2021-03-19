const { join } = require("path")
const Sass = require("sass")
const { fileURLToPath } = require("url")
const VueLoaderPlugin = require("vue-loader/lib/plugin.js")

module.exports = {
  entry: "./demo.js",
  output: {
    path: join(__dirname, "docs"),
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
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 22528,
              esModule: false,
            },
          },
        ],
      },
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
  plugins: [new VueLoaderPlugin()],
  mode: "development",
}
