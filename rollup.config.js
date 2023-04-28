/* eslint-env node */

const terser = require("@rollup/plugin-terser");

module.exports = {
  input: "tourbuilder.js",
  output: {
    format: "iife",
  },
  plugins: [terser()],
};
