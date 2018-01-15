import yargs from 'yargs'
import create from './commands/create'
import start from './commands/start'
import build from './commands/build'

// eslint-disable-next-line
yargs
  .command(create)
  .command(start)
  .command(build)
  .demandCommand()
  .help()
  .argv
