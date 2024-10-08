module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    quotes: [2, 'single'],
    'constructor-super': 'error',
    'no-duplicate-imports': 2,
    'no-duplicate-case': 2,
    '@typescript-eslint/no-empty-function': 'off'
  },
};
