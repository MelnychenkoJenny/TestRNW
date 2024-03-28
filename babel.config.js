module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        pure: true,
        displayName: false,
      },
    ],
    ['babel-plugin-react-docgen-typescript', { exclude: 'node_modules' }],
  ],
}
