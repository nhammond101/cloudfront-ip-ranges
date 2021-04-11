module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['@typescript-eslint'],
  extends: ['waracle/typescript'],
  rules: {
    'lines-between-class-members': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
      // "moduleDirectory": [
      //   "node_modules",
      //   "src/"
      // ]
      // }
    },
  },
};
