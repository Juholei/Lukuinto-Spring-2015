
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {
  },
  create: function() {
    this.game.stage.backgroundColor = '#ffffff';
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.button = this.game.add.button(this.game.world.centerX,this.game.world.centerY, 'button', this.actionClick, this);
    this.button.events.onInputDown.add(this.toggleFullscreen, this);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  },
  toggleFullscreen: function() {
    if(this.game.scale.isFullScreen) {
      this.game.scale.stopFullScreen();
    }
    else {
      this.game.scale.startFullScreen();
    }
  },
  actionClick: function() {
    console.log("actionClick");
    var style = { font: '65px Arial', fill: 'white', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Painoit nappia!', style);
  }
};

module.exports = Menu;
