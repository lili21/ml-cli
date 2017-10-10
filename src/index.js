import yargs from 'yargs'
import create from './commands/create'
import watch from './commands/watch'
// import build from './commands/build'

// eslint-disable-next-line
yargs
  .command(create)
  .command(watch)
  // .command(build)
  .demandCommand()
  .help()
  .argv
