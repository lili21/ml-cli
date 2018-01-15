import { resolve } from 'path'
import { access } from 'fs'
import { readFile } from 'jsonfile'
import devConfig from './dev.config'
import prodConfig from './prod.config'
import promisify from '../promisify'

export default async function (argv) {
  const { isProd } = argv
  const cwd = process.cwd()
  const babelrc = await readJson(resolve(cwd, '.babelrc'))
  const browsers = (await readJson(resolve(cwd, 'package.json'))).browserslist || [ '> 1%', 'last 2 versions' ]
  argv.cwd = cwd
  argv.babelrc = babelrc
  argv.browsers = browsers

  const config = isProd ? prodConfig(argv) : devConfig(argv)

  const mlConfig = resolve(cwd, 'ml.config.js')
  let customConfigFn = () => {}
  try {
    await promisify(access)(mlConfig)
    require('babel-register')({ presets: [ require.resolve('babel-preset-env') ] })
    const fn = require(mlConfig)
    customConfigFn = (fn && fn.default) || fn
  } catch (e) {}

  try {
    customConfigFn(config, argv)
  } catch (e) {}

  return config
}

async function readJson (path, _result = {}) {
  try {
    return await promisify(readFile)(path)
  } catch (e) {
    return _result
  }
}
