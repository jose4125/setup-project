const path = require('path');
const plugins = require('./webpack.plugins');

console.log('path ===========', path.resolve(__dirname, './postcss.config.js'))

module.exports = {
  context: path.join(__dirname, '../'),
  entry: {
    main: './src/main.js'
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'

  },
  devServer: {
    contentBase: 'dist',
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
           {
             loader: 'style-loader'
           },
           {
             loader: 'css-loader'
           },
           {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
              config: {
                path: path.resolve(__dirname, './postcss.config.js')
              }
            },
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html'
            }
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'html-loader',
            options: {
              attrs: [
                "img:src"
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
         {
           loader: 'file-loader',
           options: {
             name: 'images/[name].[ext]'
           }
         }
        ]
      }
    ]
  },
  plugins: [
    plugins.StyleLintPlugin
  ]
}
