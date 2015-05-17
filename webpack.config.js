var path = require('path');
var webpack = require('webpack');

module.exports = {

  cache: true,
  watch: true,

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './app/app.js'
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [

      // ES6 modules
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        loader: 'babel'
      },

      // Stylesheets
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'styles')
        ],
        loader: 'style-loader!css-loader'
      }

    ]
  }

};
