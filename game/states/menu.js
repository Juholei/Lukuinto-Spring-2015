'use strict';
var Point = require('../prefabs/point');

function Menu() {}

Menu.prototype = {
  preload: function() {
  },
  create: function() {
    //Just testing some features
    // this.backgroundsprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background-box');
    // this.backgroundsprite.scale.setTo(2, 2);
    // this.backgroundsprite.anchor.x = 0.5;
    // this.backgroundsprite.anchor.y = 0.5;

    //Actually usable code
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.fullScreenButton = this.game.add.button(30, 30, 'answer-buttons', this.actionClick, this, 2, 0);
    this.fullScreenButton.scale.setTo(0.5, 0.5);
    this.fullScreenButton.events.onInputDown.add(this.toggleFullscreen, this);

    this.startButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'button', this.actionOnClick, this);
  },
  update: function() {
    // this.backgroundsprite.angle += 1;
  },
  toggleFullscreen: function() {
    if(this.game.scale.isFullScreen) {
      this.game.scale.stopFullScreen();
    }
    else {
      this.game.scale.startFullScreen();
    }
  },
  actionOnClick: function() {
    this.game.state.start('play');
  }
};

module.exports = Menu;
