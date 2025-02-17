import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "rollup-plugin-babel"
import pkg from "./package.json"

export default [
  // browser-friendly UMD build
  {
    input: "src/main.js",
    output: {
      name: "w3-build-order",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [
      resolve(), // so Rollup can find `lodash.clonedeep`
      commonjs(), // so Rollup can convert `lodash.clonedeep` to an ES module
      babel({
        exclude: ["node_modules/**"],
      }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/main.js",
    external: ["lodash.clonedeep"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [
      babel({
        exclude: ["node_modules/**"],
      }),
    ],
  },
]
