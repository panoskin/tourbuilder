/* eslint-env node */

const terser = require("@rollup/plugin-terser");

module.exports = {
  input: "tourbuilder.js",
  output: {
    file: "dist/tourbuilder.min.js",
    format: "iife",
  },
  plugins: [terser()],
};
