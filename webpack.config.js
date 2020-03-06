const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const { resolve } = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const webpackConfig = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_props: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            typeofs: false,
          },
          mangle: {
            safari10: true,
          },
        },
        sourceMap: true,
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isProduction ? '"production"' : '"development"',
      },
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            mergeLonghand: false,
            cssDeclarationSorter: false,
          },
        ],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: isProduction,
        },
      },
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
          isProduction ? { loader: MiniCssExtractPlugin.loader } : 'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

if (isDevelopment) {
  webpackConfig.devServer = {
    compress: true,
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    liveReload: false,
    overlay: {
      warnings: true,
      errors: true,
    },
  };

  webpackConfig.plugins = [
    ...webpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin({}),
  ];
}

if (isProduction) {
  webpackConfig.mode = 'production';
  webpackConfig.devtool = '';

  webpackConfig.plugins = [
    ...webpackConfig.plugins,
    new MiniCssExtractPlugin({
      ignoreOrder: true,
    }),
  ];
}

module.exports = webpackConfig;
