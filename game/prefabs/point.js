'use strict';

var Point = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'point');
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(0.5, 0.5);
  this.inputEnabled = true;
  this.events.onInputDown.add(this.clickListener, this);
};

Point.prototype = Object.create(Phaser.Sprite.prototype);
Point.prototype.constructor = Point;

Point.prototype.update = function() {
};

Point.prototype.clickListener = function() {
    console.log("Changing state to quiz");
    this.game.state.start('quiz', false);
  }

module.exports = Point;
