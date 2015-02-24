'use strict';
var Point = require('../prefabs/point');

function Menu() {}

Menu.prototype = {
  preload: function() {
  },
  create: function() {
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.backgroundImage = this.game.add.sprite(0, 0, 'menu-background');
    this.fullScreenButton = this.game.add.button(30, 30, 'fullscreenButton');
    this.fullScreenButton.scale.setTo(0.25, 0.25);
    this.fullScreenButton.events.onInputDown.add(this.toggleFullscreen, this);

    this.startButton = this.game.add.button(402, 614, 'start-button', this.actionOnClick, this, 1, 0);
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
  }
};

module.exports = Menu;
