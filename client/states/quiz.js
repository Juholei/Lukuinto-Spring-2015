'use strict';
var ToggleButton = require('../prefabs/togglebutton');
var Point = require('../prefabs/point');
var Announcement = require('../prefabs/announcement');
var BrowsableTextArea = require('../prefabs/browsabletextarea');

var defaultBackgroundKey = 'default-quiz';

function Quiz() {}
Quiz.prototype = {
  preload: function() {
  },
  create: function() {
    this.currentTask = this.game.data.getTaskForCurrentPoint();
    this.addBackgroundImage();
    this.addQuestionTextArea();
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
    var backgroundImageKey = this.currentTask.image;
    if (backgroundImageKey === undefined) {
      backgroundImageKey = this.game.data.getBackgroundForCurrentPoint();
    }
    if (backgroundImageKey === undefined) {
      backgroundImageKey = defaultBackgroundKey;
    }

    var backgroundScenery = this.game.add.sprite(this.game.world.centerX, 0, backgroundImageKey);
    backgroundScenery.width = 576;
    backgroundScenery.anchor.setTo(0.5, 0);
  },
  addQuestionTextArea: function() {
    this.questionArea = new BrowsableTextArea(this.game, this.currentTask.question);
    this.game.add.existing(this.questionArea);
  },
  addButtonBackground: function() {
    this.buttonBackground = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'answer-background');
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
  confirmOnClick: function(button) {
    var selectedButton = this.answerButtons.iterate('toggled', true, Phaser.Group.RETURN_CHILD);

    if (selectedButton !== null) {
      this.answerButtons.setAll('inputEnabled', false);
      this.questionArea.inputEnabled = false;
      button.inputEnabled = false;
      this.handleAnswer(selectedButton.answer);
    } else {
      console.log('No answer selected.');
    }
  },
  handleAnswer: function(answer) {
    console.log('Selected answer: ' + answer.text + ' correct: ' + answer.isCorrect);
    if (answer.isCorrect) {
      this.announcement = new Announcement(this.game, this.correctAnswerGiven, this, true);
    } else {
      this.announcement = new Announcement(this.game, this.wrongAnswerGiven, this, false);
    }
    this.game.add.existing(this.announcement);
  },
  correctAnswerGiven: function() {
    this.game.data.markPointAs(Point.STATES.UNVISITED, Point.STATES.NEXT);
    console.log('Answered correctly. Changing state to play');
    this.game.data.saveToLocalStorage();
    this.game.state.start('play');
  },
  wrongAnswerGiven: function() {
    console.log('Answer was wrong. Restarting quiz state.');
    this.game.data.wrongAnswers++;
    this.announcement.destroy();
    this.game.state.restart(false);
  }
};
module.exports = Quiz;
