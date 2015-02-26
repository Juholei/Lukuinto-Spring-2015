'use strict';

var Avatar = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'avatar', frame);
  this.anchor.setTo(0.5, 1);
  this.scale.setTo(0.25, 0.25);
};

Avatar.prototype = Object.create(Phaser.Sprite.prototype);
Avatar.prototype.constructor = Avatar;

Avatar.prototype.update = function() {
};

Avatar.prototype.moveTo = function(point) {
  this.x = point.x;
  this.y = point.y;
};

module.exports = Avatar;
