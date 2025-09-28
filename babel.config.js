module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.json'],
          alias: {
            '@components': './src/components',
            '@components/*': './src/components/*',
            '@config': './src/config',
            '@config/*': './src/config/*',
            '@theme': './src/theme',
            '@theme/*': './src/theme/*',
            '@services': './src/services',
            '@services/*': './src/services/*',
            '@hooks': './src/hooks',
            '@hooks/*': './src/hooks/*',
            '@store': './src/store',
            '@store/*': './src/store/*',
            '@types': './src/types',
            '@types/*': './src/types/*',
            '@utils': './src/utils',
            '@utils/*': './src/utils/*',
          },
        },
      ],
    ],
  };
};
