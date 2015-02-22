'use strict';

var Point = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'point', frame);
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(0.25, 0.25);

  // initialize your prefab here
  
};

Point.prototype = Object.create(Phaser.Sprite.prototype);
Point.prototype.constructor = Point;

Point.prototype.update = function() {
  // write your prefab's specific update code here
};

module.exports = Point;
