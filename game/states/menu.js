'use strict';
var Point = require('../prefabs/point');

function Menu() {}

Menu.prototype = {
  preload: function() {
  },
  create: function() {
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.fullScreenButton = this.game.add.button(30, 30, 'fullscreenButton');
    this.fullScreenButton.scale.setTo(0.5, 0.5);
    this.fullScreenButton.events.onInputDown.add(this.toggleFullscreen, this);

    this.startButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'button', this.actionOnClick, this);
  },
  update: function() {
  },
  toggleFullscreen: function() {
    if(this.game.scale.isFullScreen) {
      this.game.scale.stopFullScreen();
      this.fullScreenButton.frame = 0;
    }
    else {
      this.game.scale.startFullScreen();
      this.fullScreenButton.frame = 1;
    }
  },
  actionOnClick: function() {
    this.game.state.start('play');
  },
  toggleButtonTexture: function() {
  }
};

module.exports = Menu;
