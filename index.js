var visualization = require('./visualization')
var create = require('./create')

var glob = require('glob')
var jsonfile = require('jsonfile')
var protoBuf = require('protocol-buffers')
var fs = require('fs')


module.exports = {
  create: create,
  visualization: visualization,
  trials: function () {
    var trials = {}
    var files = glob.sync(__dirname + '/trials/*.maze', [])
    files.forEach(function (el) {
      obj = jsonfile.readFileSync(el)[0]
      trials[obj.name] = obj
    })
    return trials
  },
  encoders: function () {
    return {
      behavior: protoBuf(fs.readFileSync(__dirname + '/proto/behavior.proto')),
      trial: protoBuf(fs.readFileSync(__dirname + '/proto/trial.proto'))
    }
  }
}
