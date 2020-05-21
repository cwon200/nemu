'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const appConfig = require('./app.config');

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const VERSION = JSON.parse(appConfig.VERSION.APP_VERSION);
const PHASE = process.env.APPLICATION_PHASE;
const DOMAIN = appConfig.DOMAIN;
const GA = appConfig.GA;

const devWebpackConfig = merge(baseWebpackConfig, {
  /* css로 sass 사용시
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  */

  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    // https: true,
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    //new webpack.DefinePlugin({
    //  'process.env': require('../config/dev.env')
    //}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs',
      inject: true,
      asset: {
        version: VERSION,
        phase: PHASE,
        cssVersion: VERSION,
        isShowDebug: true,
        domain: DOMAIN,
        ga: GA,
      }
    }),
    new CopyWebpackPlugin([{
        from: path.join(__dirname, "../src/css/service.css"),
        to: path.join(__dirname, "../dist/css/service." + VERSION + ".css"),
        transform: function (content, path) {
          var convert = content.toString().replace(/sprite\.png/gim, 'sprite.' + VERSION + '.png')
            .replace(/sprite@2x\.png/gim, 'sprite@2x.' + VERSION + '.png')
            .replace(/sprite-m\.png/gim, 'sprite-m.' + VERSION + '.png')
            .replace(/sprite@2x-m\.png/gim, 'sprite@2x-m.' + VERSION + '.png');
          return Buffer.from(convert);
        }
      },
      /*
      {
        from: path.join(__dirname, "../src/img/sprite.png"),
        to: path.join(__dirname, "../dist/img/sprite." + VERSION + ".png")
      },
      {
        from: path.join(__dirname, "../src/img/sprite-m.png"),
        to: path.join(__dirname, "../dist/img/sprite-m." + VERSION + ".png")
      },
      {
        from: path.join(__dirname, "../src/img/tmp"),
        to: path.join(__dirname, "../dist/img/tmp")
      },
      {
        from: path.join(__dirname, "../src/img/about"),
        to: path.join(__dirname, "../dist/img/about")
      },
      {
        from: path.join(__dirname, "../src/img/beta"),
        to: path.join(__dirname, "../dist/img/beta")
      },
      {
        from: path.join(__dirname, "../src/img/ems"),
        to: path.join(__dirname, "../dist/img/ems")
      },
      {
        from: path.join(__dirname, "../src/img/error"),
        to: path.join(__dirname, "../dist/img/error")
      },
      {
        from: path.join(__dirname, "../src/img/wizard"),
        to: path.join(__dirname, "../dist/img/wizard")
      },
      {
        from: path.join(__dirname, "../src/img/og-tag.png"),
        to: path.join(__dirname, "../dist/img/og-tag.png")
      },
      {
        from: path.join(__dirname, "../src/img/favicon.ico"),
        to: path.join(__dirname, "../dist/img/favicon.ico")
      },
      */
      // {
      //  from: path.join(__dirname, "../src/img/sprite@2x.png"),
      //  to: path.join(__dirname, "../dist/img/sprite@2x." + VERSION + ".png")
      // },
    ]),

    //new CopyWebpackPlugin([
    //  {
    //    from: path.join(__dirname, `../src/css`),
    //    to: path.join(__dirname, `../dist/css`)
    //  },
    //  {
    //    from: path.join(__dirname, `../src/img`),
    //    to: path.join(__dirname, `../dist/img`)
    //  }
    //]),
    // copy custom static assets
    //new CopyWebpackPlugin([
    //  {
    //    from: path.resolve(__dirname, '../static'),
    //    to: config.dev.assetsSubDirectory,
    //    ignore: ['.*']
    //  }
    //])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
