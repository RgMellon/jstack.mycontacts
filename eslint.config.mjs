import globals from "globals";
import pluginJs from "@eslint/js";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      quotes: ["error", "single"], // Enforce single quotes
      "prettier/prettier": ["error", { singleQuote: true }], // Integrate Prettier with ESLint
    },
  },
  pluginJs.configs.recommended,
  prettierConfig, // Disable conflicting ESLint rules
];
