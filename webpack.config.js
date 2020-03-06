const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        include: [
          resolve(__dirname, 'src'),
        ],
        exclude: /node_moduels/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_moduels/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
