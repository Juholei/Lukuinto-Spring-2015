'use strict';
var ToggleButton = require('../prefabs/togglebutton');
var Point = require('../prefabs/point');
var defaultBackgroundKey = 'taustakuva_kauppatori';

function Quiz() {}
Quiz.prototype = {
  preload: function() {
  },
  create: function() {
    this.currentTask = this.game.data.getTaskForCurrentPoint();
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
    var backgroundImageKey = this.game.data.getBackgroundForCurrentPoint();
    if (backgroundImageKey === undefined) {
      backgroundImageKey = defaultBackgroundKey;
    }
    this.backgroundScenery = this.game.add.sprite(this.game.world.centerX, 0, backgroundImageKey);
    this.backgroundScenery.scale.setTo(0.75, 0.75);
    this.backgroundScenery.anchor.setTo(0.5, 0);
  },
  addTitleText: function() {
    var textStyle = {font: '32px Arial', fill: '#000', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX, 25, this.currentTask.question,  textStyle);
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
    var answers = this.currentTask.answers;

    var buttonA = new ToggleButton(this, centerX - 215, centerY + 170, this, this.answerButtons, 'A', answers[0]);
    var buttonB = new ToggleButton(this, centerX + 3, centerY + 170, this, this.answerButtons, 'B', answers[1]);
    var buttonC = new ToggleButton(this, centerX - 215, centerY + 260, this, this.answerButtons, 'C', answers[2]);
    var buttonD = new ToggleButton(this, centerX + 3, centerY + 260, this, this.answerButtons, 'D', answers[3]);

    var confirmButton = this.game.add.button(centerX + 250, this.game.world.height, 'quiz-confirm', this.confirmOnClick, this);
    confirmButton.scale.setTo(0.35, 0.35);
    confirmButton.anchor.setTo(0.5, 1);
  },
  confirmOnClick: function() {
    var selectedButton = this.answerButtons.iterate('toggled', true, Phaser.Group.RETURN_CHILD);

    if (selectedButton !== null) {
      console.log('Selected answer: ' + selectedButton.answer.text + ' correct: ' + selectedButton.answer.isCorrect);

      if (selectedButton.answer.isCorrect) {
        this.game.data.markPointAs(Point.STATES.UNVISITED, Point.STATES.NEXT);
        console.log('Answered correctly. Changing state to play');
        this.game.state.start('play');
      } else {
        console.log('Answer was wrong.');
      }
    } else {
      console.log('No answer selected.');
    }
  }
};
module.exports = Quiz;
