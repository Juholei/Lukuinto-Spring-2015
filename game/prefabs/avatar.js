'use strict';

var Avatar = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'avatar', frame);
  this.anchor.setTo(0.5, 1);
  this.scale.setTo(0.25, 0.25);
  game.physics.arcade.enable(this);
  this.destination = null;
};

Avatar.prototype = Object.create(Phaser.Sprite.prototype);
Avatar.prototype.constructor = Avatar;

Avatar.prototype.update = function() {
  if(this.destination !== null) {
    if(Phaser.Point.distance(this, this.destination) < 1) {
      this.destination = null;
      this.body.velocity.setTo(0, 0);
    }
  }
};

Avatar.prototype.moveTo = function(game, point) {
  this.destination = point;
  game.physics.arcade.moveToObject(this, point);
};

module.exports = Avatar;
