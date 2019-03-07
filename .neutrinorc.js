module.exports = {
  use: [
    '@neutrinojs/airbnb-base',
    [
      '@neutrinojs/library',
      {
        name: 'react-native-android-backer'
      }
    ],
    '@neutrinojs/jest'
  ]
};
