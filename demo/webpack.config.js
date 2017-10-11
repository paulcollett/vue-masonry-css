const webpack = require('webpack')

module.exports = {
  entry: './index.js',
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'buble-loader', exclude: /node_modules/ }
    ]
  },
  output: {
    filename: './demo-bundle.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}
