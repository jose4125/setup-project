const path = require('path');
const plugins = require('./webpack.plugins');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.join(__dirname, '../'),
  entry: {
    main: './src/main.js',
  },
  mode: 'production',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, './postcss.config.js'),
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src'],
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    plugins.StyleLintPlugin,
    plugins.HtmlProdWebpackPlugin,
    plugins.MiniCssExtractPlugin,
    plugins.OptimizeCssAssetsPlugin,
    plugins.DefineProdPlugin,
    plugins.MinifyPlugin,
    plugins.CompressionPlugin,
    plugins.BrotliPlugin,
    plugins.CleanWebpackPlugin,
  ],
};
