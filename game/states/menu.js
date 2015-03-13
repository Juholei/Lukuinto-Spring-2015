'use strict';
var GameData = require('../prefabs/gamedata');

function Menu() {}

Menu.prototype = {
  preload: function() {
    this.load.json('gamedata', 'assets/gamedata.json', true);
  },
  create: function() {
    var loadedGameState = window.localStorage.getItem('lukuinto-2015');
    if (loadedGameState !== null) {
      this.game.data = new GameData(JSON.parse(loadedGameState));
    } else {
      this.game.data = new GameData(this.game.cache.getJSON('gamedata'));
    }
    this.game.add.sprite(0, 0, 'menu-background');
    this.game.add.button(402, 614, 'start-button', this.actionOnClick, this, 1, 0);

    if (this.game.device.fullscreen) {
      this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
      var fullScreenButton = this.game.add.button(30, 30, 'fullscreenButton');
      fullScreenButton.scale.setTo(0.25, 0.25);
      fullScreenButton.events.onInputDown.add(this.toggleFullscreen, this);
    }

    this.game.add.button(5, 100, 'avatar_1', this.selectAvatar, this);
    this.game.add.button(5, 150, 'avatar_2', this.selectAvatar, this);

  },
  update: function() {
  },
  toggleFullscreen: function(button) {
    if (this.game.scale.isFullScreen) {
      this.game.scale.stopFullScreen();
      button.frame = 0;
    } else {
      this.game.scale.startFullScreen();
      button.frame = 1;
    }
  },
  actionOnClick: function() {
    this.game.state.start('play');
  },
  selectAvatar: function(item) {
    this.game.data.selectedAvatarKey = item.key;
  }
};

module.exports = Menu;
