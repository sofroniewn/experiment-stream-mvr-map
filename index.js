var through = require('through2')
var distance = require('ray-to-lines')
var collision = require('line-to-lines')
var inside = require('point-in-polygon')
var math = require('mathjs')
var from = require('from2')
var now = require('performance-now')

function convertMap (maze) {
  var map = {}
  map['area'] = []
  maze.area.forEach(function (el) {
    var line = []
    for (var i = 0; i < el.x.length; i++) {
      line.push([el.x[i], el.y[i]])
    }
    map['area'].push(line)
  })
  map['borders'] = []
  maze.borders.forEach(function (el) {
    var line = []
    for (var i = 0; i < el.x.length; i++) {
      line.push([el.x[i], el.y[i]])
    }
    map['borders'].push(line)
  })
  map['triggers'] = []
  maze.triggers.forEach(function (el) {
    var line = []
    for (var i = 0; i < el.x.length; i++) {
      line.push([el.x[i], el.y[i]])
    }
    map['triggers'].push(line)
  })
  map['links'] = []
  maze.links.forEach(function (el) {
    map['links'].push([[el.x[0], el.y[0]], [el.x[1], el.y[1]]], [[el.x[2], el.y[2]], [el.x[3], el.y[3]]])
  })
  map['name'] = maze.name
  return map
}

module.exports = function () {
  var map = null
  var nextMap = null
  var trialStream = from.obj(function () {})
  var positionForward = null
  var positionLateral = null
  var position = null
  var trialNumber = null
  var startTime = null
  var advancedFlag = false
  var playerStart = [0, .5]
  var maze = null

  return {
    createStream: function () {
      var prevTime = now()
      var reward = false
      var angles = [0, 90, 180]
      var collisionFlag = false
      var linkedFlag = false

      function move(position, delta){
        // do collision on links
        var link = collision([position, [position[0] + delta[0], position[1] + delta[1]]], map.links)        
        if (link.component !== false) {
          if (link.component%2===0) {
            position[0] -= (map.links[link.component][0][0] - map.links[link.component+1][0][0])
            position[1] -= (map.links[link.component][0][1] - map.links[link.component+1][0][1])
            trialNumber++
            maze = nextMap[0]
            map = convertMap(maze)
            linkedFlag = true
            trialStream.push({
              maze: maze,
              trial: trialNumber,
              init: false,
              link: true,
              advance: false
            })
          } else {
            // position[0] -= (map.links[link.component][0][0] - map.links[link.component-1][0][0])
            // position[1] -= (map.links[link.component][0][1] - map.links[link.component-1][0][1])
            // trialNumber--
            var scale = (link.distance-.1)/math.norm(delta)
            position[0] += delta[0]*scale
            position[1] += delta[1]*scale
            delta[0] = 0
            delta[1] = 0
            collisionFlag = true
          }
        }

        // do collision detection on boundary
        var hit = collision([position, [position[0] + delta[0], position[1] + delta[1]]], map.borders)
        if (hit.id !== false) {
          var scale = (hit.distance-.1)/math.norm(delta)
          position[0] += delta[0]*scale
          position[1] += delta[1]*scale
          collisionFlag = true
        } else {
          position[0] += delta[0]
          position[1] += delta[1]
        }
        return position
      }

      return through.obj(function (data, enc, callback) {
        if (startTime === null) {
          startTime = now()
        }
        var curTime = now()
        var deltaTime = curTime - prevTime
        prevTime = curTime
        var elapsedTime = curTime - startTime
        var dateTime = Date.now()

        collisionFlag = false
        linkedFlag = false
        var delta = [data.velocityLateral, data.velocityForward]
        position = move([positionLateral, positionForward], delta)
        positionLateral = position[0]
        positionForward = position[1]

        var wallDistance = [0, 0, 0]
        var hit = [[[[0, 0], [0, 0]], [[0, 0], [0, 0]]], [[[0, 0], [0, 0]], [[0, 0], [0, 0]]], [[[0, 0], [0, 0]], [[0, 0], [0, 0]]]]
        
        // measure distances to obstacles
        angles.forEach(function (ang, i) {
          var start = [positionLateral, positionForward]
          var hitI = distance(start, ang, map.borders)
          var link = distance(start, ang, map.links)
          if (hitI.distance > link.distance) {
            wallDistance[i] += link.distance
            hit[i][0] = [[start[0], start[1]], [link.intersection[0], link.intersection[1]]]
            if (link.component%2===0) {
              start = [link.intersection[0] - (map.links[link.component][0][0] - map.links[link.component+1][0][0]), link.intersection[1] - (map.links[link.component][0][1] - map.links[link.component+1][0][1])]
            } else {
              start = [link.intersection[0] - (map.links[link.component][0][0] - map.links[link.component-1][0][0]), link.intersection[1] - (map.links[link.component][0][1] - map.links[link.component-1][0][1])]
            }
            hitI = distance(start, ang, map.borders)
          } else {
            hit[i][0] = [[start[0], start[1]], [start[0], start[1]]]
          }
            wallDistance[i] += hitI.distance
            hit[i][1] = [[start[0], start[1]], [hitI.intersection[0], hitI.intersection[1]]]
        })

        reward = false
        map.triggers.forEach(function (poly) {
          if (inside([positionLateral, positionForward], poly)) reward = true
        })

        callback(null, {
          positionForward: positionForward,
          positionLateral: positionLateral,
          velocityForward: data.velocityForward,
          velocityLateral: data.velocityLateral,
          response: data.response,
          reward: reward,
          trialNumber: trialNumber,
          wallLeft: wallDistance[2],
          wallRight: wallDistance[0],
          wallForward: wallDistance[1],
          link: linkedFlag,
          collision: collisionFlag,
          advance: advancedFlag,
          deltaTime: deltaTime,
          time: elapsedTime,
          date: dateTime,
          hit: hit
        })
        advancedFlag = false
      })
    },
    updateTrial: function(newMap) {
      nextMap = [newMap]
    },
    advanceTrial: function() {
      trialNumber++
      maze = nextMap[0]
      map = convertMap(maze)
      positionForward = playerStart[1]
      positionLateral = playerStart[0]
      advancedFlag = true
      trialStream.push({
        maze: maze,
        trial: trialNumber,
        init: false,
        link: false,
        advance: true
      })
    },
    initTrial: function(newMap) {
      trialNumber = 0
      maze = newMap
      map = convertMap(maze)
      nextMap = [newMap]
      startTime = null
      positionForward = playerStart[1]
      positionLateral = playerStart[0]
      advancedFlag = true
      trialStream.push({
        maze: maze,
        trial: trialNumber,
        init: true,
        link: false,
        advance: false
      })
    },
    trialStream: trialStream
  }
}