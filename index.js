var through = require('through2')
var distance = require('ray-to-lines')
var collision = require('line-to-lines')
var inside = require('point-in-polygon')
var math = require('mathjs')

module.exports = {
  createStream: function (map) {
    var position = map.playerStart
    var trialNumber = 0
    var prevTime = Date.now()
    var reward = false
    var angles = [0, 90, 180]

    function move(position, delta, map){
      // do collision on links
      var link = collision([position, [position[0] + delta[0], position[1] + delta[1]]], map.links)        
      if (link.component !== false) {
        if (link.component%2===0) {
          position[0] -= (map.links[link.component][0][0] - map.links[link.component+1][0][0])
          position[1] -= (map.links[link.component][0][1] - map.links[link.component+1][0][1])
          trialNumber++
        } else {
          position[0] -= (map.links[link.component][0][0] - map.links[link.component-1][0][0])
          position[1] -= (map.links[link.component][0][1] - map.links[link.component-1][0][1])
          trialNumber--
        }
      }

      // do collision detection on boundary
      var hit = collision([position, [position[0] + delta[0], position[1] + delta[1]]], map.borders)
      if (hit.id !== false) {
        var scale = (hit.distance-.1)/math.norm(delta)
        position[0] += delta[0]*scale
        position[1] += delta[1]*scale
      } else {
        position[0] += delta[0]
        position[1] += delta[1]
      }
      return position
    }

    return through.obj(function (data, enc, callback) {
      var curTime = Date.now()
      var deltaTime = curTime - prevTime
      prevTime = curTime
      
      var delta = [data.velocity.lateral, data.velocity.forward]
      position = move(position, delta, map)
      
      var wallDistance = [0, 0, 0]
      var hit = [[[[0, 0], [0, 0]], [[0, 0], [0, 0]]], [[[0, 0], [0, 0]], [[0, 0], [0, 0]]], [[[0, 0], [0, 0]], [[0, 0], [0, 0]]]]
      
      // measure distances to obstacles
      angles.forEach(function (ang, i) {
        var start = position
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
        if (inside(position, poly)) reward = true
      })

      callback(null, {
        position: {
          forward: position[1],
          lateral: position[0],
        },
        velocity: data.velocity,
        response: data.response,
        reward: reward,
        trialNumber: trialNumber,
        wallDistance: {
          right: wallDistance[0],
          forward: wallDistance[1],
          left: wallDistance[2],
        },
        //link: link,
        //collision: collision,
        time: deltaTime,
        hit: hit
      })
    })
  }
}