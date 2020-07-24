"use strict";

const razzleHeroku = require("razzle-heroku");

module.exports = {
  plugins: [
    {
      name: "typescript",
      options: {
        forkTsChecker: {
          typescript: false,
        },
      },
    },
    "scss",
  ],
  modify: (config, { target, dev }, webpack) => {
    config = razzleHeroku(config, { target, dev }, webpack);
    if (target == "web") {
      config.node = { fs: "empty", module: "empty" };
    }
    if (process.env.ANALYZER) {
      const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
      config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
  },
};
