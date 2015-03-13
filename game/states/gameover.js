'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function() {
  },
  create: function() {
    this.game.add.sprite(0, 0, 'game_over_background');
    window.localStorage.clear();
    var instructionText = this.game.add.text(this.game.world.centerX, 600, 'Klikkaa palataksesi alkuun',
      {font: '18px Arial', fill: 'white', align: 'center'});
    instructionText.anchor.setTo(0.5, 0.5);
    console.log(this.game.data.wrongAnswers + ' wrong answers given');
  },
  update: function() {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('menu');
    }
  }
};
module.exports = GameOver;
