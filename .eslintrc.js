// eslint-disable-next-line no-undef
module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es2021": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 12,
    "sourceType": "module",
  },
  "plugins": [
    "react",
  ],
  "settings": {
    "react": {
      "version": "17.0.1",
    },
  },
  "rules": {},
};
