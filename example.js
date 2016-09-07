var experiment = require('./')()
var device = require('../tinberg-dev-mvr-stdin')()
var deviceStream = device.createStream()

var throughStream = experiment.createBehaviorStream()
var resultsStream = deviceStream.pipe(throughStream)
resultsStream.pipe(deviceStream)
experiment.trialStream.on('data', console.log)


var trials = experiment.getTrials()
experiment.setCurrentTrial(trials[0])
experiment.setNextTrial(trials[1])


console.log('testing')

process.stdin.on('data', function(data) {
  if (data.toString().trim() === 'n') {
    experiment.advanceTrial()
  }
})


var expState = false
process.stdin.on('data', function(data) {
  if (data.toString().trim() === 'p') {
    if (expState) {
      console.log('stopping')
      device.stop()
    } else {
      console.log('starting')
      device.start()
    }
    expState = !expState
  }
})