const webpack = require('webpack');
const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Config = require("./_config");
const MarkdownRSSGeneratorPlugin = require("markdown-rss-generator-webpack-plugin").default;
const MarkdownToJS = require("markdown-to-js-webpack-plugin").default;
const {GenerateSW} = require('workbox-webpack-plugin');


process.env.NODE_ENV = "development";
module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  entry: [
    "@babel/polyfill",
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].[hash].js'
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
          from: 'netlify.toml',
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
    new MarkdownToJS(),
    new GenerateSW({
      maximumFileSizeToCacheInBytes:1e+7,
      skipWaiting:true,
      runtimeCaching: [{
        urlPattern: new RegExp('/\.(js|css)$/i'),
        handler: 'StaleWhileRevalidate'
      }],
      exclude: [/\.(md|png|jpe?g|gif|xml|toml|txt|gz)$/i,/CNAME/i,/md\.js/i],
      swDest:'sw.js'
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