'use strict';

var LabeledButton = function(game, x, y, label, callback, callbackContext) {
  Phaser.Button.call(this, game, x, y, 'button', callback, callbackContext, 1, 0);
  this.anchor.setTo(0.5, 0.5);

  var textStyle = {font: '32px Arial', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: 280};
  var buttonText = this.game.add.text(0, 0, label, textStyle);
  buttonText.anchor.setTo(0.5, 0.5);
  this.addChild(buttonText);
};

LabeledButton.prototype = Object.create(Phaser.Button.prototype);
LabeledButton.prototype.constructor = LabeledButton;

LabeledButton.prototype.update = function() {
};

module.exports = LabeledButton;
