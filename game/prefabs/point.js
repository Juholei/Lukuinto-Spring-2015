'use strict';

var Point = function(game, x, y, callbackContext) {
  Phaser.Sprite.call(this, game, x, y, 'point');
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(0.5, 0.5);
  this.inputEnabled = true;
  this.events.onInputDown.add(this.clickListener, callbackContext);
};

Point.prototype = Object.create(Phaser.Sprite.prototype);
Point.prototype.constructor = Point;

Point.prototype.update = function() {
};

//Callback context here is Play state
//Parameter item is the clicked item i.e. object of this class
Point.prototype.clickListener = function(item) {
    console.log('Changing state to quiz');
    this.avatar.moveTo(this.game, item);
    // this.game.state.start('quiz', false);
};

module.exports = Point;
