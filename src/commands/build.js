import runWebpack from '../webpack/run-webpack'
export default {
  command: 'build',

  describe: 'Build for production.',

  handler (argv) {
    argv.isProd = true
    runWebpack(argv)
  }
}
