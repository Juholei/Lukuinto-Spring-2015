'use strict';

var Avatar = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, game.data.selectedAvatarKey, 0);
  this.game = game;
  this.destination = null;
  this.anchor.setTo(0.5, 1);
  this.game.add.existing(this);
  this.game.physics.arcade.enable(this);
  this.movementFinishedCallback = function defaultCallback() {
    console.log('Stopped moving and no custom callback set.');
  };
};

Avatar.prototype = Object.create(Phaser.Sprite.prototype);
Avatar.prototype.constructor = Avatar;

Avatar.prototype.update = function() {
  if (this.destination !== null) {
    if (Phaser.Point.distance(this, this.destination) < 1) {
      this.destination = null;
      this.body.velocity.setTo(0, 0);
      this.movementFinishedCallback();
    }
  }
};

Avatar.prototype.moveTo = function(point, callback) {
  this.destination = point;
  this.game.physics.arcade.moveToObject(this, point, 90);
  this.movementFinishedCallback = callback;
};

module.exports = Avatar;
