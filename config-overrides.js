const TerserPlugin = require('terser-webpack-plugin');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return {
    ...config,
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_fnames: true,
            keep_classnames: true,
          },
        }),
      ],
    },
    stats: {warnings: false},
    ignoreWarnings: [/Failed to parse source map/],
    resolve: {
      ...config.resolve,
      fallback: {
        fs: false,
        path: require.resolve('path-browserify'),
        url: require.resolve('url'),
      },
    },
  };
};
