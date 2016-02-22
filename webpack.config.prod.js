require('dotenv').config({ path: '.env.prod' });
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file?name=images/[name].[ext]'
      }
    ]
  },
  postcss: function() {
    return [autoprefixer];
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'BASE_URL'
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      title: process.env.PROJECT_NAME
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json']
  }
};
