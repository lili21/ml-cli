import runWebpack from '../webpack/run-webpack'
export default {
  command: 'watch',

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
    argv.isProd = false
    argv.cwd = process.cwd()
    runWebpack(argv)
  }
}
