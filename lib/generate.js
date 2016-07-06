var async = require('async')
var Metalsmith = require('metalsmith')
var render = require('consolidate').handlebars.render
// var Handlebars = require('handlebars')
var askQuetions = require('./ask')

// Handlebars.registerHelper('raw-helper', function (options) {
//   return options.fn()
// })

module.exports = function generate (name, template, dest, done) {
  var metalsmith = Metalsmith(template)
  var metadata = metalsmith.metadata()

  metadata.noEscape = true
  metalsmith
    .use(askQuetions(name))
    .use(renderTemplate)
    .clean(false)
    .source('.')
    .destination(dest)
    .build(function (err) {
      done(err)
    })
}

function renderTemplate (files, metalsmith, done) {
  var keys = Object.keys(files)
  var metalsmithMetadata = metalsmith.metadata()
  async.each(keys, function (file, next) {
    var str = files[file].contents.toString()

    if (!/{{([^{}]+)}}/g.test(str)) {
      return next()
    }

    render(str, metalsmithMetadata, function (err, res) {
      if (err) return next(err)
      files[file].contents = new Buffer(res)
      next()
    })
  }, done)
}
