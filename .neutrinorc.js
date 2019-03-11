module.exports = {
  use: [
    [
      '@neutrinojs/airbnb-base',
      {
        eslint: {
          rules: {
            'function-paren-newline': 'off',
            'import/no-extraneous-dependencies': 'off',
            'no-unused-expressions': 'off',
          },
        },
      },
    ],
    'neutrino-preset-prettier-eslint',
    [
      '@neutrinojs/library',
      {
        name: 'react-native-android-backer',
      },
    ],
    '@neutrinojs/jest',
  ],
};
