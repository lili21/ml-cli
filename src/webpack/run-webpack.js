import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import chalk from 'chalk'
import ip from 'ip'
import ora from 'ora'
import rm from 'rimraf'
import buildWebpackConfig from './build-webpack-config'

export default function (argv) {
  console.log(argv)
  if (argv.isProd) {
    prodBuild(argv)
  } else {
    devBuild(argv)
  }
}

function devBuild (argv) {
  const port = argv.port
  const config = buildWebpackConfig(argv)
  const compiler = webpack(config)
  compiler.plugin('done', stats => {
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

function prodBuild (argv) {
  const spinner = ora('building for production ...')
  spinner.start()

  const config = buildWebpackConfig(argv)
  rm('dist/', err => {
    if (err) throw err
    webpack(config, (err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
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
    })
  })
}
