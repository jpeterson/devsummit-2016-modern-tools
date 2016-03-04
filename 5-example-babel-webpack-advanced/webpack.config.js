/* eslint-env es6:false */

const autoprefixer = require('autoprefixer');
const calc = require('postcss-calc');
const colorFunction = require('postcss-color-function');

// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ],
    preLoaders: [
      { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ]
  },

  // Create source map
  devtool: 'eval-source-map',

  // Process CSS
  postcss: function () {
    return [calc, colorFunction, autoprefixer({ browsers: ['last 2 versions'] })];
  },

  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['', '.js', '.json']
  }
};
