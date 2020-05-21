'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var appConfig = require('./app.config')

//Project Version
const VERSION = JSON.parse(appConfig.VERSION.APP_VERSION)
const PHASE = process.env.APPLICATION_PHASE.toLowerCase()
const DOMAIN = appConfig.DOMAIN
const GA = appConfig.GA


const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  /* css를 sass 사용시
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  */

  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  // output: {
  //   path: config.build.assetsRoot,
  //   filename: utils.assetsPath('js/[name].[chunkhash].js'),
  //   chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  // },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    /* static 폴더에 css를 놓을 경우
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    */

    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      inject: true,
      asset: {
        version: VERSION,
        phase: PHASE.toUpperCase(),
        cssVersion: VERSION,
        isShowDebug: PHASE !== 'real',
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
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks (module) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity
    // }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'app',
    //   async: 'vendor-async',
    //   children: true,
    //   minChunks: 3
    // }),

    // copy custom static assets
    // static 사용시
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, `../static/monitor/l7check.html`),
        to: path.join(__dirname, `../dist/static/monitor/l7check.html`)
      },
      {
        from: path.join(__dirname, `../static/ipblock`),
        to: path.join(__dirname, `../dist/static/ipblock`)
      },
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
