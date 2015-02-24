'use strict';

var ToggleButton = function(game, x, y, key, callbackContext, overFrame, outFrame, downFrame, upFrame) {
  Phaser.Button.call(this, game, x, y, key, this.clickListener, callbackContext, overFrame, outFrame, downFrame, upFrame);

  // initialize your prefab here
  
};

ToggleButton.prototype = Object.create(Phaser.Button.prototype);
ToggleButton.prototype.constructor = ToggleButton;

ToggleButton.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

ToggleButton.prototype.clickListener = function(button) {
    // if (!button.toggled) {
      // button.setFrames(button.frame - 1, button.frame);
      console.log('Button pressed');
    // }
};

module.exports = ToggleButton;
