'use strict';

var MajorPoint = function(game, x, y, state, callback, callbackContext) {
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
  this.inputEnabled = true;
  if (callback !== undefined) {
    this.events.onInputDown.add(callback, callbackContext);
  }
  if (state === 'end' && !game.data.isEndReachable()) {
    this.visible = false;
    this.inputEnabled = false;
  }
};

MajorPoint.prototype = Object.create(Phaser.Sprite.prototype);
MajorPoint.prototype.constructor = MajorPoint;

MajorPoint.prototype.update = function() {};

module.exports = MajorPoint;
