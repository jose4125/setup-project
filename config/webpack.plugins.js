const webpack = require('webpack');
const path = require('path');
const _StyleLintPlugin = require('stylelint-webpack-plugin');
const _HtmlWebpackPlugin = require('html-webpack-plugin');
const _MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const _MinifyPlugin = require('babel-minify-webpack-plugin');
const _CompressionPlugin = require('compression-webpack-plugin');
const _BrotliPlugin = require('brotli-webpack-plugin');
const _CleanWebpackPlugin = require('clean-webpack-plugin');

const StyleLintPlugin = new _StyleLintPlugin({
  context: path.resolve(__dirname, '../src'),
  files: '**/*.css',
  failOnError: false,
  quiet: false,
});

const HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

const HtmlDevWebpackPlugin = new _HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../src/index.html'),
  inject: true,
});

const HtmlProdWebpackPlugin = new _HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../src/index.html'),
  inject: true,
  chunks: ['vendor', 'main'],
});

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: '[name]-[contenthash].css',
});
const OptimizeCssAssetsPlugin = new _OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.css$/g,
  cssProcessor: require('cssnano'),
  canPrint: true,
});

const DefineProdPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});

const DefineDevPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
});

const MinifyPlugin = new _MinifyPlugin();

const CompressionPlugin = new _CompressionPlugin({
  algorithm: 'gzip',
});

const BrotliPlugin = new _BrotliPlugin();

const CleanWebpackPlugin = new _CleanWebpackPlugin(
  path.resolve(__dirname, '../dist'),
  {},
);

module.exports = {
  StyleLintPlugin,
  HotModuleReplacementPlugin,
  HtmlProdWebpackPlugin,
  HtmlDevWebpackPlugin,
  MiniCssExtractPlugin,
  OptimizeCssAssetsPlugin,
  DefineProdPlugin,
  DefineDevPlugin,
  MinifyPlugin,
  CompressionPlugin,
  BrotliPlugin,
  CleanWebpackPlugin,
};
