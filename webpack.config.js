/* eslint-disable global-require */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

const { resolve } = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const webpackConfig = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  optimization: {
    splitChunks: {
      // chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
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
    new VuetifyLoaderPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isProduction ? '"production"' : '"development"',
      },
    }),
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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s(c|a)ss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              isProduction ? { loader: MiniCssExtractPlugin.loader } : 'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:8]',
                  },
                },
              },
              'postcss-loader',
              'sass-loader',
            ],
          },
          {
            test: /\.module\.\w+$/,
            use: [
              isProduction ? { loader: MiniCssExtractPlugin.loader } : 'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:8]',
                  },
                },
              },
              'postcss-loader',
              'sass-loader',
            ],
          },
          {
            use: [
              isProduction ? { loader: MiniCssExtractPlugin.loader } : 'vue-style-loader',
              'css-loader',
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  implementation: require('sass'),
                  sassOptions: {
                    fiber: require('fibers'),
                  },
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[name].css',
      ignoreOrder: true,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ];
}

module.exports = webpackConfig;
