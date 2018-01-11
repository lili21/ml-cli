import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import chalk from 'chalk'
import ip from 'ip'
import ora from 'ora'
import rm from 'rimraf'
import buildWebpackConfig from './build-webpack-config'
import promisify from '../promisify'

export default async function (argv) {
  if (argv.isProd) {
    await prodBuild(argv)
  } else {
    await devBuild(argv)
  }
}

async function devBuild (argv) {
  const spinner = ora('compiling ...')
  spinner.start()

  const port = argv.port
  const config = await buildWebpackConfig(argv)
  const compiler = webpack(config)
  compiler.plugin('done', stats => {
    spinner.stop()
    const serverAddr = `http://localhost:${chalk.bold(port)}`
    const localIpAddr = `http://${ip.address()}:${chalk.bold(port)}`

    if (stats.hasErrors()) {
      console.error(chalk.red('Build failed!\n\n'))
    } else {
      console.log(chalk.green('Compiled successfully!\n\n'))
      console.log('You can view the application in browser.\n\n')
      console.log(`${chalk.bold('Local:')}             ${serverAddr}\n`)
      console.log(`${chalk.bold('On Your Network:')}   ${localIpAddr}\n`)
    }
  })

  const server = new WebpackDevServer(compiler, config.devServer)
  server.listen(port)
}

async function prodBuild (argv) {
  const spinner = ora('building for production ...')
  spinner.start()

  const config = await buildWebpackConfig(argv)
  await promisify(rm)('dist/')
  const stats = await promisify(webpack)(config)
  spinner.stop()
  console.log(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
}
