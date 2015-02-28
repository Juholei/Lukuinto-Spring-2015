'use strict';

var ToggleButton = function(game, x, y, callbackContext, group, label) {
  Phaser.Button.call(this, game, x, y, 'answer-button', this.clickListener, callbackContext, 1, 0, 1, 0);
  this.group = group;
  this.group.add(this);
  this.toggled = false;

  var labelText = game.add.text(50, this.height / 2, label, { font: '32px Arial', fill: 'white', align: 'center'});
  this.addChild(labelText);

  labelText.anchor.setTo(0.5, 0.5);
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

  if(previousState === false) {
    button.toggle(true);
  }
};

ToggleButton.prototype.toggle = function (toggled) {
    this.toggled = toggled;
    if(this.toggled) {
        this.setFrames(1,1, 1, 1);
    }
    else {
        this.setFrames(1, 0, 1, 0);
    }
};

module.exports = ToggleButton;
