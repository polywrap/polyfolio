module.exports = function override(config, env) {
  //do stuff with the webpack config...
  const appConfig = {
    ...config,
    stats: {warnings: false},
    ignoreWarnings: [/Failed to parse source map/],
    resolve: {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
        os: false,
        url: false,
      },
    },
  };

  return appConfig;
};
