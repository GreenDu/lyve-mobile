module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  plugins.push(
    [
      '@tamagui/babel-plugin',
      {
        components: ['tamagui'],
        config: './tamagui.config.ts',
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '@api': './src/api/*',
          '@components': './src/components/*',
          '@modules': './src/modules/*',
          '@screens': './src/screens/*',
          '@utils': './src/utils/*',
          '@types': './src/types/*',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ]
  );

  return {
    presets: ['babel-preset-expo'],

    plugins,
  };
};
