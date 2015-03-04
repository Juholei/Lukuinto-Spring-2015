'use strict';

var Point = function(game, pointData, callback, callbackContext) {
  Phaser.Sprite.call(this, game, pointData.x, pointData.y, 'point');
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(0.5, 0.5);
  this.pointData = pointData;
  this.setState(pointData.state);
  this.events.onInputDown.add(callback, callbackContext);
};

Point.STATES = {
  UNVISITED: 'unvisited',  //Not visited yet and not reachable
  VISITED: 'visited',      //Already visited. Can't go back?
  CURRENT: 'current',      //Current place
  NEXT: 'next'             //Next Point where you can go
};

Point.prototype = Object.create(Phaser.Sprite.prototype);
Point.prototype.constructor = Point;

Point.prototype.update = function() {};

Point.prototype.setState = function(state) {
  this.state = state;
  switch (state) {
    case Point.STATES.CURRENT:
      this.frame = 2;
      break;
    case Point.STATES.NEXT:
      this.frame = 1;
      this.inputEnabled = true;
      break;
    case Point.STATES.UNVISITED:
      this.frame = 0;
      this.visible = false;
      break;
    case Point.STATES.VISITED:
      this.frame = 3;
      break;
    default:
      console.log('Unsupported state encountered: ' + state);
  }
};
module.exports = Point;
