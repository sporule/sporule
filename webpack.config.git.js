const webpack = require('webpack');
const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const Config = require("./_config");

let route = "https://raw.githubusercontent.com/" + process.env.GITHUB_REPOSITORY + "/gh-pages/";
let repo = process.env.GITHUB_REPOSITORY.split("/")[1];

let replaceString = `href: "/` + repo + "/";
let cnameFile = "404.html";
if (Config.gh_custom_domain) {
  replaceString = 'href: "/';
  cnameFile = "CNAME";
}

const GLOBALS = {
  'process.env.ROUTE': JSON.stringify(route),
  'process.env.REPO': JSON.stringify(repo)
};


module.exports = {
  mode: "production",
  entry: [
    "@babel/polyfill",
    path.resolve(__dirname, 'src/index.js'),
    path.resolve(__dirname, 'gh-pages/index.js')
  ],
  mode: "production",
  target: 'web',
  externals: {
    "jquery": "jQuery"
  },
  output: {
    path: __dirname + '/dist',
    publicPath: Config.gh_custom_domain ? "/" : '/' + repo + "/",
    filename: '[name].[contenthash].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "template/")
        ],
        loader: 'string-replace-loader',
        options: {
          search: 'href\: \"\/',
          replace: replaceString,
          flags: 'g'
        }
      },
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
        test: /(\.css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
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
        },
        {
          context: __dirname + "/gh-pages",
          from: '404.html',
          to: '',
        },
        {
          context: __dirname + "/gh-pages",
          from: cnameFile,
          to: '',
        }
      ]
    ),
    new SitemapPlugin(Config.url, [
      "/"
    ]),
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: "*",
          allow: "/"
        }
      ],
      sitemap: Config.url + "/sitemap.xml",
      host: Config.url
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      templateParameters: Config
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new OfflinePlugin({
      responseStrategy: 'cache-first',
      excludes: ['**/.*', '**/*.map', '**/*.gz', '**/*.txt', '**/sw.js', '**/*.md', '**/_redirects', '**/*.jpg', '**/*.png', '**/*.gif', "**/CNAME"],
      autoUpdate: 1000 * 60 * 60 * 10,
      externals: [
        'https://cdn.jsdelivr.net/npm/pwacompat@2.0.7/pwacompat.min.js',
        'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.slim.min.js',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
      ],
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].css"
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
