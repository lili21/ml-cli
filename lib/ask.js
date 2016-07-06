var inquirer = require('inquirer')

module.exports = function (name) {
  var prompts = [{
    name: 'name',
    message: 'Project Name',
    default: name
  }, {
    name: 'description',
    message: 'Project Description',
    default: 'A li.li\'s project'
  }, {
    name: 'author',
    message: 'Author',
    default: 'li.li'
  }]

  return function (files, metalsmith, done) {
    var data = metalsmith.metadata()

    inquirer.prompt(prompts).then(function (answers) {
      Object.keys(answers).forEach(function (key) {
        data[key] = answers[key]
      })
      done()
    })
  }
}
