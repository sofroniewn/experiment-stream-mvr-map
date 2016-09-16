var experiment = require('./')()
var device = require('../tinberg-dev-mvr-stdin')()
var deviceStream = device.createStream()
var program = require('commander')

program
  .option('-s, --session [number]', 'Number of session', 0)
  .option('-l, --logging [bool]', 'State of logging', false)
  .parse(process.argv)


var trialStream = experiment.trialStream
var throughStream = experiment.createBehaviorStream()
var behaviorStream = deviceStream.pipe(throughStream)
behaviorStream.pipe(deviceStream)
//trialStream.on('data', console.log)


var trials = experiment.getTrials()
experiment.startTrial(trials[0])
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


var mkdirp = require('mkdirp')
var leftPad = require('left-pad')
var logging = require('time-stream')

var encoders = experiment.getEncoders()
var loggingFlag = program.logging
var sessionNumber = program.session
var loggingDataStream = null
var loggingTrialStream = null
if (loggingFlag) {
  console.log('start logs')
  var savePath = './logs/' + leftPad(sessionNumber, 6, 0) + '/behavior'
  mkdirp(savePath)
  if (loggingDataStream !== null) behaviorStream.unpipe(loggingDataStream)
  loggingDataStream = logging.createWriteStream(savePath + '/behavior.data', encoders.behavior.Data)
  behaviorStream.pipe(loggingDataStream)
  if (loggingTrialStream !== null) trialStream.unpipe(loggingTrialStream)
  loggingTrialStream = logging.createWriteStream(savePath + '/trial.data', encoders.trial.Data)
  trialStream.pipe(loggingTrialStream)
}