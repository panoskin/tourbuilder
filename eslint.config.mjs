import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["cypress/**/*.cy.js"],
    languageOptions: {
      globals: {
        describe: false,
        it: false,
        cy: false,
        Cypress: false,
      },
    },
  },
];
