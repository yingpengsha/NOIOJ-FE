module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'no-param-reassign': 'off',
    'no-restricted-syntax': 0,
    'no-prototype-builtins':0,
    'import/prefer-default-export': 'off',
    'max-len': ["error", { "code": 150}],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
