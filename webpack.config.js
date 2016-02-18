const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /(\.js|\.jsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /bundle\.js$/,
        loader: 'eslint'
      }
    ],
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
  eslint: {
    configFile: '.eslint.json'
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['','.jsx','.scss','.js','.json']
  },
  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  }
};
