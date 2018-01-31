import path from 'path'
import autoprefixer from 'autoprefixer'
// import px2rem from 'postcss-pxtorem'
// import atImport from 'postcss-import'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import BBO from './build-babel-options'

export const resolvePath = _path => {
  return path.resolve(process.cwd(), _path)
}

export const srcPath = resolvePath('src')

export default function (argv) {
  const { isProd } = argv

  return {
    entry: { app: ['./src/'] },

    output: {
      path: resolvePath('dist'),
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].chunk.js'
    },

    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, '../node_modules')
      ],
      extensions: ['.jsx', '.js'],
      alias: {
        '@': srcPath
      }
    },

    resolveLoader: {
      modules: [
        'node_modules',
        path.resolve(__dirname, '../node_modules')
      ]
    },

    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    },

    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          enforce: 'pre',
          include: srcPath,
          use: [
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProd
              }
            }
          ]
        },

        {
          test: /\.(css|s[ac]ss)$/,
          include: srcPath,
          oneOf: getLoadersForStyle(argv, true)
        },

        {
          test: /\.(css|s[ac]ss)$/,
          exclude: srcPath,
          use: getLoadersForStyle(argv, false)
        },

        {
          test: /\.jsx?$/,
          include: [srcPath, /webpack-dev-server/],
          use: [
            {
              loader: 'babel-loader',
              options: BBO(argv)
            }
          ]
        },

        {
          test: /react-loadable/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                plugins: [
                  require.resolve('babel-plugin-transform-object-assign')
                ]
              }
            }
          ]
        },

        {
          // test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif|mp4|mov|ogg|webm)(\?.*)?$/i,
          include: srcPath,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'static/assets/[name].[hash:6].[ext]'
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new ExtractTextPlugin({
        filename: 'static/css/[name].[contenthash:6].css',
        // allChunks: true,
        disable: !isProd
      })
    ]
  }
}

function getLoadersForStyle ({ isProd, browsers }, isSrc) {
  const _getLoaders = isModules => {
    return [
      {
        loader: 'css-loader',
        options: isModules
          ? {
            sourceMap: !isProd,
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]--[local]__[hash:base64:5]'
          } : {
            sourceMap: !isProd,
            importLoaders: 1
          }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            // atImport(),
            autoprefixer({ browsers }),
            // px2rem({ rootValue: 37.5, propWhiteList: [] })
          ],
          sourceMap: !isProd
        }
      }
    ]
  }

  const loadersForGlboal = _getLoaders(false)
  const loadersForModules = _getLoaders(true)

  if (isSrc) {
    // src目录下的样式
    return [
      {
        resourceQuery: /modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: loadersForModules
        })
      },
      {
        resourceQuery: /useable/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader/useable',
          use: loadersForGlboal
        })
      },
      {
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: loadersForGlboal
        })
      }
    ]
  } else {
    // 非src目录下的样式，node_modules
    return ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: loadersForGlboal
    })
  }
}
