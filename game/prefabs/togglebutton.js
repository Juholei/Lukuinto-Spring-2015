'use strict';

var ToggleButton = function(game, x, y, callbackContext, group, overFrame, outFrame, downFrame, upFrame) {
  Phaser.Button.call(this, game, x, y, 'answer-buttons', this.clickListener, callbackContext, 1, 0, downFrame, upFrame);
  this.group = group;
  this.group.add(this)
  this.toggled = false;

  // initialize your prefab here
  
};

ToggleButton.prototype = Object.create(Phaser.Button.prototype);
ToggleButton.prototype.constructor = ToggleButton;

ToggleButton.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

ToggleButton.prototype.clickListener = function(button) {
  var previousState = button.toggled;
  console.log('Button pressed');
  button.group.forEach(function(item) {
    item.toggle(false);
    console.log(item.frame);
  }, this);

  if(previousState === false) {
    button.toggle(true);
  }
  console.log(button.frame);
};

ToggleButton.prototype.toggle = function (toggled) {
    this.toggled = toggled;
    console.log('Toggled to ' + toggled);
    if(this.toggled) {
        this.frame = 1;
    }
    else {
        this.frame = 0;
    }
};

module.exports = ToggleButton;
