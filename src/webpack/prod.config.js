// import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
// import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import baseConfig from './base.config'

export default function (argv) {
  const config = merge(baseConfig(argv), {
    devtool: 'hidden-source-map',
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

      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      }),

      new webpack.optimize.ModuleConcatenationPlugin(),

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

      new webpack.NamedChunksPlugin(chunk => {
        if (chunk.name) {
          return chunk.name
        } else {
          // return chunk.mapModules(m => path.relative(m.context, m.request)).pop()
          // 根据路径hash或许是更好的方案，
          return 'no-name-chunk'
        }
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks (module) {
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            /node_modules/.test(module.resource)
          )
        }
      }),

      // extract webpack runtime and module manifest to its own file in order to
      // prevent vendor hash from being updated whenever app bundle is updated
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime',
        minChunks: Infinity
      }),

      // extracts shared chunks from code splitted chunks
      // https://github.com/webpack/webpack/issues/4392
      new webpack.optimize.CommonsChunkPlugin({
        name: 'app',
        async: 'async-vendor',
        children: true,
        minChunks: 3
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
