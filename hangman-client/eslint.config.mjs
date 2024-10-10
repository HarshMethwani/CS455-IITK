import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginComplexity from "eslint-plugin-complexity";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["src/**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      react: pluginReact,
      complexity: pluginComplexity,
      'react-hooks': pluginReactHooks
    },
    rules: {
      'react/react-in-jsx-scope': 'error',
      'complexity': ['error', { max: 10 }],
      'react/prop-types': 'error',
      'react-hooks/rules-of-hooks': 'error', 
      'react-hooks/exhaustive-deps': 'warn',
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
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];