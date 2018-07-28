const path = require("path");
const webpack = require("webpack");
const bundlePath = path.resolve(__dirname, "../dist");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    context: path.resolve(__dirname, ".."),
    main: "./index.js",
    vendor: ['react', 'react-dom', 'relay-runtime']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-2'],
          plugins: ['transform-react-jsx', 'relay']
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.html$/,
        use: [
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
            }
          }
        ]
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(bundlePath)
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(bundlePath),
    new CleanWebpackPlugin(
      ["dist"],
      { root: path.resolve(__dirname , '..'), verbose: false },
    ),
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: './public/index.html'
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
};
