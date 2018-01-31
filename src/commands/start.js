import chalk from 'chalk'
import checkDeps from 'check-dependencies'
import runWebpack from '../webpack/run-webpack'
export default {
  command: 'start',

  describe: 'Start a development live-reload server.',

  builder: {
    port: {
      description: 'port to start a server on',
      default: '8080',
      alias: 'p'
    },
    https: {
      description: 'Use HTTPS?',
      type: 'boolean',
      default: false
    }
  },

  async handler (argv) {
    const { depsWereOk, error } = await checkDeps({ packageDir: process.cwd() })
    if (depsWereOk) {
      argv.env = 'development'
      argv.isProd = false
      await runWebpack(argv)
    } else {
      [
        ...error.slice(0, -1),
        `Invoke ${chalk.green('yarn')} to install missing packages`
      ].forEach((e) => {
        console.log(e)
        console.log()
      })
    }
  }
}
