const webpack = require('webpack');
const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var OfflinePlugin = require('offline-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Config = require("./_config");
const MarkdownRSSGeneratorPlugin = require("markdown-rss-generator-webpack-plugin").default;

process.env.NODE_ENV = "development";


module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  entry: [
    "@babel/polyfill",
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  externals: {
    "jquery": "jQuery"
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    historyApiFallback: true,
    port: 8000
  },
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.js$/,
        loaders: ['unlazy'],
        include: /node_modules\/markdown-toc/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.md$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'posts/'
          }
        }]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  plugins: [
    new CopyPlugin(
      [
        {
          context: __dirname + '/src',
          from: '_redirects',
          to: '',
        },
        {
          context: __dirname + "/posts",
          from: 'images/**/*',
          to: '',
        }
      ]
    ),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      templateParameters: Config
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].css"
    }),
    new MarkdownRSSGeneratorPlugin({
      title: Config.site,
      outputPath: "rss.xml", //rss file output path
      description: Config.description,
      link: Config.url,
      language: "en",
      image: "https://i.imgur.com/vfh3Une.png",
      favicon: "https://i.imgur.com/vfh3Une.png",
      copyright: "All rights reserved 2019, Sporule",
      updated: new Date(), //updated date
      generator: "Sporule",
      author: {
        name: "Sporule",
        email: "example@example.com",
        link: "https://www.sporule.com"
      },
    }),
    new OfflinePlugin({
      ServiceWorker: {
        events: true
      },
      responseStrategy: 'cache-first',
      excludes: ['**/.*', '**/*.map', '**/*.gz'],
      autoUpdate: 1000 * 60 * 2,
      externals: [
        'https://cdn.jsdelivr.net/npm/pwacompat@2.0.7/pwacompat.min.js',
        'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.slim.min.js',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
      ],
    }),
    new WebpackPwaManifest({
      name: Config.site,
      short_name: Config.site,
      description: Config.description,
      display: "standalone",
      start_url: ".",
      crossorigin: null,
      background_color: '#ffffff',
      includeDirectory: true,
      inject: true,
      ios: true,
      orientation: 'any',
      crossorigin: 'anonymous', //can be null, use-credentials or anonymous
      "theme_color": "#3367D6",
      icons: [
        {
          src: path.resolve('publish_assets/logo-ios.png'),
          sizes: [120, 152, 167, 180, 1024],
          destination: path.join('icons', 'ios'),
          ios: true
        },
        {
          src: path.resolve('publish_assets/logo-ios.png'),
          size: 1024,
          destination: path.join('icons', 'ios'),
          ios: 'startup'
        },
        {
          src: path.resolve('publish_assets/logo.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512],
          destination: path.join('icons', 'android')
        }
      ],
      ios: {
        'apple-mobile-web-app-title': Config.site,
        'apple-mobile-web-app-status-bar-style': 'black-translucent'
      }
    })
  ]
}