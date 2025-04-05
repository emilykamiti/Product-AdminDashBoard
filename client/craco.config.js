// filepath: /home/nasinza/ProductAdminDashBoard/client/craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
        if (rule.oneOf) {
          rule.oneOf = rule.oneOf.map((oneOfRule) => {
            if (
              oneOfRule.loader &&
              oneOfRule.loader.includes("source-map-loader")
            ) {
              oneOfRule.exclude = /node_modules\/react-datepicker/;
            }
            return oneOfRule;
          });
        }
        return rule;
      });
      return webpackConfig;
    },
  },
};
