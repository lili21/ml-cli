import runWebpack from '../webpack/run-webpack'
export default {
  command: 'build',

  describe: false,

  builder: {
    env: {
      description: 'enviroment to build for',
      default: 'production',
      alias: 'e',
      choices: ['staging', 'production']
    }
  },

  async handler (argv) {
    argv.isProd = true
    await runWebpack(argv)
  }
}
