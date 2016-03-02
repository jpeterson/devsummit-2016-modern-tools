/* eslint object-shorthand: 0, func-names: 0 */

// webpack.production.config.js PRODUCTION

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    vendors: ['react']
  },
  output: {
    path: './dist'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        compact: true,
        comments: false
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }],
    preLoaders: [
      { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ]
  },

  plugins: [
    // Build a 'vendors.js' file for 3rd party code
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),

    // Build an 'index.html' file in /prod (using a template)
    new HtmlWebpackPlugin({
      title: 'App Title',
      template: 'index.ejs', // Load a custom template
      inject: 'body'
    })
  ],

  // Process CSS
  postcss: function () {
    return [require('postcss-calc'), require('postcss-color-function'), require('autoprefixer')];
  },
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['', '.js', '.json']
  }
};
