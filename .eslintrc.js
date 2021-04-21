
module.exports = {
  root: true,
  /* only if using TypeScript. If so, run 'yarn add @typescript-eslint/parser' */
  // parser: '@typescript-eslint/parser',
  plugins: [
    /* only if using TypeScript. If so, run 'yarn add @typescript-eslint/eslint-plugin' */
    // '@typescript-eslint',
    /* only if using React. If so, run 'yarn add eslint-plugin-react' */
    // 'react',
  ],
  parserOptions: {
    // will be used most of the time as I typically work in module-based frameworks
    sourceType: 'module',
    ecmaVersion: 2017,
    ecmaFeatures: {
      //  only if using JSX
      // jsx: true
    },
  },
  extends: [
    'eslint:recommended',
    // only if using TypeScript
    // 'plugin:@typescript-eslint/recommended',
    // only if using React
    // 'plugin:react/recommended',
  ],
  rules: {
    'no-console': 'error',
    // the two below are only if using TypeScript
    // '@typescript-eslint/ban-types': 'warn',
    // '@typescript-eslint/no-unused-vars': 'error',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
}

