'use strict';

var ToggleButton = function(game, x, y, callback, callbackContext, answer) {
  Phaser.Button.call(this, game, x, y, 'answer-button', callback, callbackContext, 1, 0);
  this.answer = answer;
  this.toggled = false;
  this.addAnswerText(game);
  this.scale.setTo(0.8);
};

ToggleButton.prototype = Object.create(Phaser.Button.prototype);
ToggleButton.prototype.constructor = ToggleButton;

ToggleButton.prototype.update = function() {
};

ToggleButton.prototype.toggle = function(toggled) {
  this.toggled = toggled;
  if (this.toggled) {
    this.setFrames(1, 1);
  } else {
    this.setFrames(1, 0);
    this.frame = 0;
  }
};

ToggleButton.prototype.addAnswerText = function(game) {
  var answerTextStyle = {font: '12pt Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 300};
  var answerText = game.add.text(this.width / 2, this.height / 2, this.answer.text, answerTextStyle);
  answerText.anchor.setTo(0.5);
  this.addChild(answerText);
};

module.exports = ToggleButton;
