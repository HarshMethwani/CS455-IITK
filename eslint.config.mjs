import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginComplexity from "eslint-plugin-complexity";


export default [
  {
    files: ["src/**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      react: pluginReact,
      complexity: pluginComplexity,
    },
    rules: {
      'react/react-in-jsx-scope': 'error',
      'complexity': ['error', { max: 10 }],
      'react/prop-types': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];