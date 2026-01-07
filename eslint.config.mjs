import jest from "eslint-plugin-jest"
import js from "@eslint/js"
import ts from "typescript-eslint"

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    rules: {
      indent: ["error", 2,
        {
          SwitchCase: 1,
          ignoredNodes: ["ConditionalExpression", "PropertyDefinition"],
        }],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "never"],
      "@typescript-eslint/no-explicit-any": "warn",
      "object-curly-newline": [
        "error",
        {
          "ImportDeclaration": { "multiline": true, "minProperties": 3, "consistent": true },
          "ExportDeclaration": { "multiline": true, "minProperties": 3, "consistent": true }
        }
      ]
    }
  },
  {
    extends: [
      jest.configs["flat/recommended"]
    ],
    plugins: {
      jest: jest
    },
    rules: {
      "jest/prefer-lowercase-title": "warn",
      "jest/prefer-todo": "warn"
    }
  }
)
