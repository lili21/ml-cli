import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import baseConfig, { resolvePath, srcPath } from './base.config'

export default function (argv) {
  const { port } = argv
  const origin = `http://0.0.0.0:${port}`

  const base = baseConfig(argv)
  const config = merge(base, {
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        inject: true
      }),
      new FriendlyErrorsPlugin()
    ],
    devServer: {
      host: '0.0.0.0',
      port: port,
      inline: true,
      hot: true,
      compress: true,
      publicPath: '/',
      contentBase: srcPath,
      disableHostCheck: true,
      historyApiFallback: true,
      quiet: true,
      clientLogLevel: 'none',
      overlay: true,
      stats: 'minimal',
      watchOptions: {
        ignored: [
          resolvePath('dist'),
          resolvePath('node_modules')
        ]
      }
    }
  })

  config.entry.app = [
    `webpack-dev-server/client?${origin}`,
    `webpack/hot/dev-server?${origin}`
  ].concat(base.entry.app)

  return config
}
