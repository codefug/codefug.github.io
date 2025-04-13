import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    "airbnb",
    "prettier",
    "next/typescript",
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:mdx/recommended",
  ),
  {
    plugins: {
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        React: true,
      },

      ecmaVersion: 12,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      "mdx/code-blocks": true,
    },

    rules: {
      "no-shadow": "off",
      "arrow-body-style": "off",
      "import/extensions": "off",
      curly: ["error", "multi"],
      camelcase: "off",
      "react/jsx-props-no-spreading": "off",
      "react/button-has-type": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": "off",
      "import/prefer-default-export": "warn",
      "import/no-extraneous-dependencies": "off",
      "no-underscore-dangle": "off",
      semi: 0,
      "react/function-component-definition": "off",
      indent: "off",
      "max-len": "off",
      "comma-dangle": "off",
      "no-redeclare": "off",
      "react/jsx-indent": "off",
      "no-unused-vars": "off",

      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],

      "operator-linebreak": "off",
      "object-curly-newline": "off",
      "function-paren-newline": "off",
      "implicit-arrow-linebreak": "off",
      "react/require-default-props": "off",
      "nonblock-statement-body-position": "off",
      "react/jsx-one-expression-per-line": "off",
      "no-use-before-define": "off",
      "@typescript-eslint/no-require-imports": "off",
      "prefer-arrow-callback": "off",
    },
  },
];
