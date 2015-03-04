'use strict';

var MajorPoint = function(game, x, y, state) {
  var frame = 0;
  if (state === 'start') {
    frame = 0;
  } else {
    frame = 1;
  }
  Phaser.Sprite.call(this, game, x, y, 'start-end', frame);
  this.state = state;
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(0.5, 0.5);
};

MajorPoint.prototype = Object.create(Phaser.Sprite.prototype);
MajorPoint.prototype.constructor = MajorPoint;

MajorPoint.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = MajorPoint;
