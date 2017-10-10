import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import chalk from 'chalk'
import ip from 'ip'
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
  // const compiler = webpack(buildWebpackConfig(argv))
}
