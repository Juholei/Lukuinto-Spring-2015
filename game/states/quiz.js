'use strict';
var ToggleButton = require('../prefabs/togglebutton');
var Point = require('../prefabs/point');

function Quiz() {}
Quiz.prototype = {
  preload: function() {
  },
  create: function() {
    this.addBackgroundImage();
    this.addTitleText();
    this.addButtonBackground();
    this.addButtons();
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
  addBackgroundImage: function() {
    this.backgroundScenery = this.game.add.sprite(this.game.world.centerX, 0, 'quiz-background-1');
    this.backgroundScenery.scale.setTo(0.75, 0.75);
    this.backgroundScenery.anchor.setTo(0.5, 0);
  },
  addTitleText: function() {
    var textStyle = {font: '32px Arial', fill: '#000', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX, 25, 'Vastaa tehtävään:',  textStyle);
    this.titleText.anchor.setTo(0.5, 0.5);
  },
  addButtonBackground: function() {
    this.buttonBackground = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'background-box');
    this.buttonBackground.scale.setTo(0.64, 0.64);
    this.buttonBackground.anchor.setTo(0.5, 1);
  },
  addButtons: function() {
    this.answerButtons = this.game.add.group();

    var centerX = this.game.world.centerX;
    var centerY = this.game.world.centerY;

    var buttonA = new ToggleButton(this, centerX - 215, centerY + 170, this, this.answerButtons, 'A');
    buttonA.scale.setTo(0.64, 0.64);

    var buttonB = new ToggleButton(this, centerX + 3, centerY + 170, this, this.answerButtons, 'B');
    buttonB.scale.setTo(0.64, 0.64);

    var buttonC = new ToggleButton(this, centerX - 215, centerY + 260, this, this.answerButtons, 'C');
    buttonC.scale.setTo(0.64, 0.64);

    var buttonD = new ToggleButton(this, centerX + 3, centerY + 260, this, this.answerButtons, 'D');
    buttonD.scale.setTo(0.64, 0.64);

    var confirmButton = this.game.add.button(centerX + 250, this.game.world.height,
     'quiz-confirm', this.confirmOnClick);
    confirmButton.scale.setTo(0.35, 0.35);
    confirmButton.anchor.setTo(0.5, 1);
  },
  confirmOnClick: function() {
    this.game.data.markPointAs(Point.STATES.UNVISITED, Point.STATES.NEXT);
    console.log('Changing state to play');
    this.game.state.start('play');
  }
};
module.exports = Quiz;
