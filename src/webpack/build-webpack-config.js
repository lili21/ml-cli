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
  const browsers = (await readJson(resolve(cwd, 'package.json'))).browserslist || [ 'Android >= 4', 'iOS >= 9' ]
  argv.cwd = cwd
  argv.babelrc = babelrc
  argv.browsers = browsers

  const config = isProd ? prodConfig(argv) : devConfig(argv)

  const llsConfig = resolve(cwd, 'lls.config.js')
  let customConfigFn = () => {}
  try {
    await promisify(access)(llsConfig)
    require('babel-register')({ presets: [ require.resolve('babel-preset-env') ] })
    const fn = require(llsConfig)
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
