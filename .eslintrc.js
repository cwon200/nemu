// https://git.linecorp.com/LINE-FE/undefined/issues/45
// https://git.linecorp.com/LINE-FE/undefined/issues/42
// https://eslint.org/docs/user-guide/configuring
// prettier override configuration for y-part : https://wiki.linecorp.com/pages/viewpage.action?spaceKey=LINEFE&title=Convention+TF+-+04.Prettier+guide
// https://prettier.io/docs/en/options.html
module.exports = {
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  env: {
    'browser': true,
    'node': true,
    'es6': true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'prettier'],
  plugins: [
    'vue', 'prettier'
  ],
  'rules': {
    'prettier/prettier': ['error'],
    // More rules
    "linebreak-style": ["error", "unix"],
    "prefer-const": "error",
    "no-var": "error",
    "no-console": "warn",
  }
}
