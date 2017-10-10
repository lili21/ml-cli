import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
// import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import baseConfig from './base.config'

export default function (argv) {
  const config = merge(baseConfig(argv), {
    devtool: 'source-map',
    output: {
      filename: 'static/js/[name].[chunkhash:6].js',
      chunkFilename: 'static/js/[name].[chunkhash:6].chunk.js',
      publicPath: '/'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new ExtractTextPlugin({
        filename: 'static/css/[name].[contenthash:6].css'
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        sourceMap: true
      }),
      // new UglifyJSPlugin({
      //   uglifyOptions: {
      //     ecma: 5,
      //     compress: {
      //       warnings: false
      //     }
      //   },
      //   sourceMap: true
      // }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(path.join(argv.cwd, 'node_modules')) === 0
          )
        }
      }),
      // extract webpack runtime and module manifest to its own file in order to
      // prevent vendor hash from being updated whenever app bundle is updated
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
      })
    ]
  })

  if (process.env.npm_config_report) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
      .BundleAnalyzerPlugin
    config.plugins.push(new BundleAnalyzerPlugin())
  }

  return config
}
