/* eslint-env node */

const terser = require("@rollup/plugin-terser");

module.exports = {
  input: "tourbuilder.js",
  output: {
    file: "dist/tourbuilder.js",
    format: "iife",
  },
  plugins: [terser()],
};
