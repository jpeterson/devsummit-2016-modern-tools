// webpack.config.js
module.exports = {
  entry: './src/app.js',
  output: {
    library: 'exampleWebpack',
    libraryTarget: 'umd',
    filename: './dist/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['', '.js', '.json']
  }
};