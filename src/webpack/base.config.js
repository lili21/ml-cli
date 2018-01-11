import path from 'path'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import BBO from './build-babel-options'

export const resolvePath = _path => {
  return path.resolve(process.cwd(), _path)
}

export const srcPath = resolvePath('src')

export default function (argv) {
  const { isProd, browsers } = argv
  const loadersForStyle = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: !isProd,
        importLoaders: 1
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [ autoprefixer({ browsers }) ],
        sourceMap: !isProd
      }
    }
  ]
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
        // {
        //   test: /\.jsx?$/,
        //   include: srcPath,
        //   enforce: 'pre',
        //   use: [
        //     {
        //       loader: 'eslint-loader',
        //       options: {
        //         formatter: eslintFormatter
        //       }
        //     }
        //   ]
        // },
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
          use: isProd
            ? ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: loadersForStyle
            })
            : [
              'style-loader',
              ...loadersForStyle
            ]
        },
        {
          test: /\.jsx?$/,
          include: srcPath,
          use: [
            {
              loader: 'babel-loader',
              options: BBO(argv)
            }
          ]
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
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
    }
  }
}
