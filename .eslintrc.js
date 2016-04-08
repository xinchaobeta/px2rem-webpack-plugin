module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  "parser": "babel-eslint",
  plugins: [
    'import'
  ],
  // add your custom rules here
  'rules': {
    "strict": 0,
    // detect import error
    "import/no-unresolved": [2, {commonjs: true}],
    // allow paren-less arrow functions
    'arrow-parens': 0,

  },

}
