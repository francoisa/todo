const path = require("path");
const bundlePath = path.resolve(__dirname, "../dist");
const merge = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: bundlePath,
    hot: true,
    hotOnly: true,
    path: bundlePath,
    port: 3000,
    proxy: { 'graphql': 'http://localhost:8080' }
  },
});
