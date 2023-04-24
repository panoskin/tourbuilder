/* eslint-env node */

const terser = require("@rollup/plugin-terser");

module.exports = {
  input: "panoskin.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
  },
  plugins: [terser()],
};
