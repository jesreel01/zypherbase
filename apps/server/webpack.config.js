const { composePlugins, withNx } = require('@nx/webpack');

module.exports = composePlugins(withNx(), (config) => {
  if (config.externals) {
    const originalExternals = config.externals;
    config.externals = [
      (context, callback) => {
        if (context.request && context.request.startsWith('@zypherbase/')) {
          return callback();
        }
        if (typeof originalExternals === 'function') {
          return originalExternals(context, callback);
        }
        if (Array.isArray(originalExternals)) {
          for (const external of originalExternals) {
            if (typeof external === 'function') {
              return external(context, callback);
            }
          }
        }
        return callback();
      },
    ];
  }
  return config;
});

