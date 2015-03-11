'use strict';

var ToggleButton = function(game, x, y, callbackContext, group, label, answer) {
  Phaser.Button.call(this, game, x, y, 'answer-button', this.clickListener, callbackContext, 1, 0);
  this.group = group;
  this.answer = answer;
  this.group.add(this);
  this.toggled = false;
  this.addLabelText(game, label);
  this.addAnswerText(game);
  this.scale.setTo(0.64, 0.64);
};

ToggleButton.prototype = Object.create(Phaser.Button.prototype);
ToggleButton.prototype.constructor = ToggleButton;

ToggleButton.prototype.update = function() {
};

ToggleButton.prototype.clickListener = function(button) {
  var previousState = button.toggled;
  button.group.forEach(function(item) {
    item.toggle(false);
  }, this);

  if (previousState === false) {
    button.toggle(true);
  }
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

ToggleButton.prototype.addLabelText = function(game, label) {
  var labelTextStyle = {font: '32px Arial', fill: 'white', align: 'center'};
  var labelText = game.add.text(50, this.height / 2, label, labelTextStyle);
  labelText.anchor.setTo(0.5, 0.5);
  this.addChild(labelText);
};

ToggleButton.prototype.addAnswerText = function(game) {
  var answerTextStyle = {font: '32px Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 200};
  var answerText = game.add.text(117, this.height / 2, this.answer.text, answerTextStyle);
  answerText.anchor.setTo(0, 0.5);
  this.addChild(answerText);
};

module.exports = ToggleButton;
