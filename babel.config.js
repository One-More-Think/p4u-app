module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          assets: './src/assets',
          components: './src/components',
          reducers: './src/reducers',
          pages: './src/pages',
          screens: './src/pages/screens',
          style: './src/style.tsx',
          utils: './src/utils',
          hooks: './src/hooks',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
        path: '.env',
      },
    ],
  ],
};
