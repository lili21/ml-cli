import { resolve } from 'path'
import { existsSync as exists } from 'fs'
import { readFileSync as readJson } from 'jsonfile'
import devConfig from './dev.config'
// import prodConfig from './prod.config'
export default function (argv) {
  const { isProd, cwd, port } = argv
  const babelrc = readJson(resolve(cwd, '.babelrc')) || {}
  const browsers = readJson(resolve(cwd, 'package.json')).browserslist || [ 'Android >= 4', 'iOS >= 8' ]
  argv.babelrc = babelrc
  argv.browsers = browsers

  let config
  if (isProd) {
    // return prodConfig({ browsers })
  } else {
    config = devConfig({ port, browsers })
  }

  const llsConfig = resolve(cwd, 'lls.config.js')
  let customConfigFn = () => {}
  if (exists(llsConfig)) {
    require('babel-register')({ presets: [ require.resolve('babel-preset-env') ] })
    const fn = require(llsConfig)
    customConfigFn = (fn && fn.default) || fn
  }

  try {
    customConfigFn(config, argv)
  } catch (e) {}

  return config
}
