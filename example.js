var experiment = require('./')
var device = require('device-stream-mvr-stdin').createStream()

map = {
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

var expt = experiment.createStream(map)

var results = device.pipe(expt)
results.on('data', console.log)
//results.pipe(device)


//////////////////////////////////////////////////////////////////
// make so when inside reward zone reward flag is set to true
// make so keypress doesn't forget ..... very annoying
// check scalings on forward wall distance
// make so can stop without getting really bad stream errors ...
// add ray / line / poly packages to npm with proper tests and readmes
//////////////////////////////////////////////////////////////////
