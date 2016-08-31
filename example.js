var Experiment = require('./')
var device = require('device-stream-mvr-stdin')()
var deviceStream = device.createStream()
device.start()

var map = {
  area: [[-15, 0], [-15, 20], [-45.2, 47.7], [-45.2, 57.7],
    [-15.3, 57.7], [-15.3, 47.7], [0, 33.7], [15.3, 47.7], [15.3, 57.7],
    [-15, 85.4], [-15, 95.4], [15, 95.4], [15, 85.4], [30.3, 71.4],
    [45.6, 85.4], [45.6, 95.4], [75.6, 95.4], [75.6, 85.4], [45.3, 57.7],
    [45.3, 47.7], [15, 20], [15, 0], [-15, 0]],
  borders: [
    [[-15, 0], [-15, 20], [-45.2, 47.7], [-45.2, 57.7],
      [-15.3, 57.7], [-15.3, 47.7], [0, 33.7], [15.3, 47.7], [15.3, 57.7],
      [-15, 85.4], [-15, 95.4]],
    [[15, 95.4], [15, 85.4], [30.3, 71.4], [45.6, 85.4], [45.6, 95.4],
      [75.6, 95.4], [75.6, 85.4], [45.3, 57.7],
      [45.3, 47.7], [15, 20], [15, 0]]
    ],
  links: [
      [[-15, 95.4], [15, 95.4]], [[-15, 0], [15, 0]],
    ],
  triggers: [
    [[4.7, 72.8], [-7.5, 84], [10.5, 84], [22.7, 72.8]]
  ],
  playerStart: [0, 5],
  playerShape: [
    [-2,-1.5], [0, 1.5], [2, -1.5]
  ]
}

var mapNEW = {
  area: [[-15, 0], [-15, 20], [-45.2, 47.7], [-45.2, 57.7],
    [-15.3, 57.7], [-15.3, 47.7], [0, 33.7], [15.3, 47.7], [15.3, 57.7],
    [-15, 85.4], [-15, 95.4], [15, 95.4], [15, 85.4], [30.3, 71.4],
    [45.6, 85.4], [45.6, 95.4], [75.6, 95.4], [75.6, 85.4], [45.3, 57.7],
    [45.3, 47.7], [15, 20], [15, 0], [-15, 0]],
  borders: [
    [[-15, 0], [-15, 20], [-45.2, 47.7], [-45.2, 57.7],
      [-15.3, 57.7], [-15.3, 47.7], [0, 33.7], [15.3, 47.7], [15.3, 57.7],
      [-15, 85.4], [-15, 95.4]],
    [[15, 95.4], [15, 85.4], [30.3, 71.4], [45.6, 85.4], [45.6, 95.4],
      [75.6, 95.4], [75.6, 85.4], [45.3, 57.7],
      [45.3, 47.7], [15, 20], [15, 0]]
    ],
  links: [
      [[-15, 95.4], [15, 95.4]], [[-15, 0], [15, 0]],
    ],
  triggers: [
    [[-100, -100], [-100, 100], [100, 100], [100, -100]]
  ],
  playerStart: [0, 5],
  playerShape: [
    [-2,-1.5], [0, 1.5], [2, -1.5]
  ]
}

var exp = Experiment()

var eStream = exp.createStream()
exp.initTrial(map)
var results = deviceStream.pipe(eStream)
//results.on('data', console.log)
results.pipe(deviceStream)
// results.on('data', function (data) {
//   console.log(data.reward)
// })

process.stdin.on('data', function(data) {
  if (data.toString().trim() === 'n') {
    exp.updateTrial(mapNEW)
  }
})


var expState = true
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

//////////////////////////////////////////////////////////////////
// make so when inside reward zone reward flag is set to true
// make so keypress doesn't forget ..... very annoying
// check scalings on forward wall distance
// make so can stop without getting really bad stream errors ...
// add ray / line / poly packages to npm with proper tests and readmes
//////////////////////////////////////////////////////////////////
