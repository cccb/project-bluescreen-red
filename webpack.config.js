
/*
 * Webpack configuration for Bluescr.exe
 */



const webpack = require('webpack');
const path    = require('path');

const TransferWebpackPlugin = require('transfer-webpack-plugin');

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath       = path.resolve(__dirname, 'static');

const config = {
  entry: {
    app: [
      path.join(__dirname, '/src/app/app.jsx'),
    ]
  },

  output: {
    path: buildPath,
    filename: 'app.js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'public'},
    ], path.resolve(__dirname, 'src')),
  ],

  resolve: {
     extensions: [ ".js", ".jsx" ],
     modules: [
        "node_modules",
        path.resolve(__dirname, "src/app")
     ]
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        exclude: [nodeModulesPath],
      },
    ],
  }
};

module.exports = config;

