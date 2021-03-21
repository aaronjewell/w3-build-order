module.exports = api => ({
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions", "safari >= 7"],
        },
        modules: api.env() === "test" ? "commonjs" : false,
      },
    ],
  ],
  plugins: ["@babel/plugin-proposal-class-properties"],
})
