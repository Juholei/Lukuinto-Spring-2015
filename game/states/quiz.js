'use strict';
var ToggleButton = require('../prefabs/togglebutton');

function Quiz() {
}
Quiz.prototype = {
  preload: function() {
  },
  create: function() {
    this.backgroundScenery = this.game.add.sprite(this.game.world.centerX, 0, 'quiz-background-1');
    this.backgroundScenery.scale.setTo(0.75, 0.75);
    this.backgroundScenery.anchor.setTo(0.5, 0);

    this.titleText = this.game.add.text(this.game.world.centerX, 25, 'Vastaa tehtävään:',  { font: '32px Arial', fill: '#000', align: 'center'});
    this.titleText.anchor.setTo(0.5, 0.5);

    this.buttonBackground = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'background-box');
    this.buttonBackground.scale.setTo(0.64, 0.64);
    this.buttonBackground.anchor.setTo(0.5, 1);

    this.answerButtons = this.game.add.group();

    var buttonA = new ToggleButton(this, this.game.world.centerX - 215, this.game.world.centerY + 170, this, this.answerButtons, 'A');
    buttonA.scale.setTo(0.64, 0.64);

    var buttonB = new ToggleButton(this, this.game.world.centerX + 3, this.game.world.centerY + 170, this, this.answerButtons, 'B');
    buttonB.scale.setTo(0.64, 0.64);

    var buttonC = new ToggleButton(this, this.game.world.centerX - 215, this.game.world.centerY + 260, this, this.answerButtons, 'C');
    buttonC.scale.setTo(0.64, 0.64);

    var buttonD = new ToggleButton(this, this.game.world.centerX + 3, this.game.world.centerY + 260, this, this.answerButtons, 'D');
    buttonD.scale.setTo(0.64, 0.64);

    var confirmButton = this.game.add.button(this.game.world.centerX + 250, this.game.world.height, 'quiz-confirm', this.confirmOnClick);
    confirmButton.scale.setTo(0.35, 0.35);
    confirmButton.anchor.setTo(0.5, 1);

  },
  update: function() {
  },
  paused: function() {
  },
  render: function() {
    // this.game.debug.inputInfo(32, 32);
    // this.game.debug.pointer( this.game.input.activePointer );
  },
  shutdown: function() {
  },
  confirmOnClick: function() {
    console.log('Changing state to play');
    this.game.state.start('play');
  }
};
module.exports = Quiz;
