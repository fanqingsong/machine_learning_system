'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '.'),
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: path.posix.join("static", 'js/[name].[chunkhash].js'),
    publicPath: "/"
  },
  plugins: [
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './dist/index.html'),
      template: path.resolve(__dirname, './src/index.html'),
      inject: true,
      minify: {
        // removeComments: true,
        // collapseWhitespace: true,
        // removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      // the next regex tells webpack to use style-loader and css-loader
      // (notice the chaining through the '!' syntax)
      // on all css files
      {
          test: /\.css$/,
          use: {
            loader: "style-loader",
            loader: "css-loader",
          }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: path.posix.join("static", 'img/[name].[hash:7].[ext]')
        }
      },
    ]
  }
}