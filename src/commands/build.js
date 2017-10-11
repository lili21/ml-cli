import runWebpack from '../webpack/run-webpack'
export default {
  command: 'build',

  describe: 'Build for production.',

  async handler (argv) {
    argv.isProd = true
    await runWebpack(argv)
  }
}
