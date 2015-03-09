'use strict';
var Point = require('../prefabs/point');

function GameData(object) {
  this.startPoint = object.startPoint;
  this.endPoint = object.endPoint;
  this.points = object.points;
}
GameData.prototype = {
  markPointAs: function(oldState, newState) {
    for (var i = 0; i < this.points.length; i++) {
      if (this.points[i].state === oldState) {
        this.points[i].state = newState;
        break;
      }
    }
  },
  getTaskForCurrentPoint: function() {
    for (var i = 0; i < this.points.length; i++) {
      if (this.points[i].state === Point.STATES.CURRENT) {
        var randomTaskIndex = Math.floor(Math.random() * this.points[i].tasks.length);
        console.log('Random index between 0 and ' + this.points[i].tasks.length + ' is ' + randomTaskIndex);
        return this.points[i].tasks[randomTaskIndex];
      }
    }
  },
  getBackgroundForCurrentPoint: function() {
    for (var i = 0; i < this.points.length; i++) {
      if (this.points[i].state === Point.STATES.CURRENT) {
        return this.points[i].image;
      }
    }
  },
  isEndReachable: function() {
    for (var i = 0; i < this.points.length; i++) {
      var unvisitedPointsExist = this.points[i].state === Point.STATES.UNVISITED || this.points[i].state === Point.STATES.NEXT;
      if (unvisitedPointsExist) {
        return false;
      }
    }
    return true;
  }
};

module.exports = GameData;
