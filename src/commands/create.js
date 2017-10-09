import path from 'path'
import { existsSync as exists } from 'fs'
import { execSync as exec } from 'child_process'
import async from 'async'
import chalk from 'chalk'
import { handlebars } from 'consolidate'
import Metalsmith from 'metalsmith'

export default {
  command: 'create <name>',
  describe: 'create new project',

  builder: {
    name: {
      description: 'project name'
    }
  },

  async handler({ name }) {
    const dest = path.resolve(process.cwd(), name)
    if (exists(dest)) {
      console.error(chalk.red(`Error: Target directory ${name} already exists.`))
      process.exit(1)
    }

    let author
    let email
    try {
      author = exec('git config --get user.name')
      email = exec('git config --get user.email')
    } catch (e) {}
    author = author ? author.toString().trim() : ''
    email = email ? ` <${email.toString().trim()}> ` : ''

    const metalsmith = Metalsmith(__dirname)
      .metadata({
        name,
        author,
        email,
        description: 'lls frontend project',
      })
      .source('../template')
      .destination(dest)
      .use(template)
      .build(err => {
        if (err) throw err
        console.log(chalk.green(`${name} project created`))
      })
  }
}

function template(files, metalsmith, done) {
  const keys = Object.keys(files)
  const metadata = metalsmith.metadata()

  async.each(keys, run, done)

  function run(file, done) {
    const str = files[file].contents.toString()
    handlebars.render(str, metadata, (err, res) => {
      if (err) return done(err)
      files[file].contents = new Buffer(res)
      done()
    })
  }
}
