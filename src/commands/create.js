import path from 'path'
import { stat } from 'fs'
import { exec } from 'child_process'
import async from 'async'
import chalk from 'chalk'
import { handlebars } from 'consolidate'
import Metalsmith from 'metalsmith'
import gitclone from 'git-clone'
import rm from 'rimraf'
import ora from 'ora'
import promisify from '../promisify'

export default {
  command: 'create <name> [repo]',
  describe: 'Create new project.',

  builder: {
    repo: {
      description: 'template repo',
      default: 'git@git.llsapp.com:frontend/mobile-template.git'
    },
    name: {
      description: 'project name'
    }
  },

  async handler ({ repo, name }) {
    const dest = path.resolve(process.cwd(), name)
    try {
      const exists = (await promisify(stat)(dest)).isDirectory()
      if (exists) {
        console.error(chalk.red(`Error: Target directory ${name} already exists.`))
        process.exit(1)
      }
    } catch (e) {}

    const spinner = ora('generating project')
    spinner.start()

    const tmp = '/tmp/lls-tmp' + Date.now()
    await promisify(gitclone)(repo, tmp, { shallow: true })
    await promisify(rm)(tmp + '/.git')

    let author
    let email
    const execAsync = promisify(exec)
    try {
      author = await execAsync('git config --get user.name')
      email = await execAsync('git config --get user.email')
    } catch (e) {}
    author = author ? author.toString().trim() : ''
    email = email ? ` <${email.toString().trim()}> ` : ''

    Metalsmith(__dirname)
      .metadata({
        name,
        author,
        email,
        description: 'lls frontend project'
      })
      .source(tmp)
      .destination(dest)
      .use(template)
      .build(err => {
        spinner.stop()
        if (err) throw err
        console.log(chalk.green(`${name} project created`))
      })

    process.on('exit', () => {
      rm.sync(tmp)
    })
  }
}

function template (files, metalsmith, done) {
  const keys = Object.keys(files)
  const metadata = metalsmith.metadata()

  async.each(keys, run, done)

  function run (file, done) {
    const str = files[file].contents.toString()
    handlebars.render(str, metadata, (err, res) => {
      if (err) return done(err)
      files[file].contents = Buffer.from(res)
      done()
    })
  }
}
