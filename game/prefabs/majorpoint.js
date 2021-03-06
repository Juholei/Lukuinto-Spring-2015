'use strict';

var MajorPoint = function(game, x, y, state, callback, callbackContext) {
  Phaser.Sprite.call(this, game, x, y, 'start-end', 0);
  this.state = state;
  this.anchor.setTo(0.5, 0.7);
  this.scale.setTo(0.5, 0.5);

  //If state is 'end' but end is not reachable, hides this object.
  //If state is 'end' and end is reachable, enables input for this object.
  if (state === 'end') {
    this.frame = 1;
    if (!game.data.isEndReachable()) {
      this.visible = false;
    } else {
      this.inputEnabled = true;
      if (callback !== undefined) {
        this.events.onInputDown.add(callback, callbackContext);
      }
    }
  }
};

MajorPoint.prototype = Object.create(Phaser.Sprite.prototype);
MajorPoint.prototype.constructor = MajorPoint;

MajorPoint.prototype.update = function() {};

module.exports = MajorPoint;
