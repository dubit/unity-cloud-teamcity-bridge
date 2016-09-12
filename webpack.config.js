'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './src/server.js'],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },

  target: 'node',

  externals: [
    // Filter out native modules and treat them as external
    function filter(context, request, callback) {
      const isExternal = request.match(/^[@a-z][a-z\/\.\-0-9]*$/i);
      callback(null, Boolean(isExternal));
    }
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  module: {
    noParse: /\.min\.js/,

    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
};