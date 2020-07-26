const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components'],
      },
      resolve: {
        alias: {
          'lottie-react-native': 'react-native-web-lottie',
        },
      },
    },
    argv
  );
  return config;
};
