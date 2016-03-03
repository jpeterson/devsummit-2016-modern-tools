/* eslint-env es6:false */

// webpack.production.config.js PRODUCTION

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const calc = require('postcss-calc');
const colorFunction = require('postcss-color-function');

module.exports = {
  entry: {
    app: './src/index.js',
    vendors: ['jquery']
  },
  output: {
    path: path.resolve(__dirname, 'prod'),
    filename: 'app.js'
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
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
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
      title: 'ES2015 + Webpack (advanced)',
      template: 'index.ejs', // Load a custom template
      inject: 'body'
    })
  ],

  // Process CSS
  postcss: function () {
    return [calc, colorFunction, autoprefixer({ browsers: ['last 2 versions'] })];
  },

  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['', '.js', '.json']
  }
};
