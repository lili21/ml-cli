import yargs from 'yargs'
import create from './commands/create'
// import start from './commands/start'
// import build from './commands/build'

yargs
  .command(create)
  // .command(start)
  // .command(build)
  .demandCommand()
  .help()
  .argv
