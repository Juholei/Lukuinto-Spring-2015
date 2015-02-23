'use strict';

function Quiz() {
}
Quiz.prototype = {
  preload: function() {
    // Override this method to add some load operations. 
    // If you need to use the loader, you may need to use them here.
  },
  create: function() {
    // This method is called after the game engine successfully switches states. 
    // Feel free to add any setup code here (do not load anything here, override preload() instead).
    this.backgroundScenery = this.game.add.sprite(this.game.world.centerX, 0, 'quiz-background-1');
    this.backgroundScenery.scale.setTo(0.75, 0.75);
    this.backgroundScenery.anchor.setTo(0.5, 0);

    this.titleText = this.game.add.text(this.game.world.centerX, 25, 'Vastaa tehtävään:',  { font: '32px Arial', fill: '#000', align: 'center'});
    this.titleText.anchor.setTo(0.5, 0.5);

    this.buttonBackground = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'background-box');
    this.buttonBackground.scale.setTo(0.64, 0.64);
    this.buttonBackground.anchor.setTo(0.5, 1);

    this.answerButtons = this.game.add.group();

    var buttonA = this.game.add.button(this.game.world.centerX - 215, this.game.world.centerY + 170, 'answer-buttons', this.actionOnClick, this, 1 , 0);
    buttonA.scale.setTo(0.64, 0.64);
    this.answerButtons.add(buttonA);

    var buttonB = this.game.add.button(this.game.world.centerX + 215, this.game.world.centerY + 170, 'answer-buttons', this.actionOnClick, this, 3 , 2);
    buttonB.anchor.setTo(1, 0);
    buttonB.scale.setTo(0.64, 0.64);
    this.answerButtons.add(buttonB);

    var buttonC = this.game.add.button(this.game.world.centerX - 215, this.game.world.centerY + 260, 'answer-buttons', this.actionOnClick, this, 5 , 4);
    buttonC.scale.setTo(0.64, 0.64);
    this.answerButtons.add(buttonC);

    var buttonD = this.game.add.button(this.game.world.centerX + 215, this.game.world.centerY + 260, 'answer-buttons', this.actionOnClick, this, 7 , 6);
    buttonD.anchor.setTo(1, 0);
    buttonD.scale.setTo(0.64, 0.64);
    this.answerButtons.add(buttonD);
  },
  update: function() {
    // state update code
  },
  paused: function() {
    // This method will be called when game paused.
  },
  render: function() {
    // Put render operations here.
  },
  shutdown: function() {
    // This method will be called when the state is shut down 
    // (i.e. you switch to another state from this one).
  },
  actionOnClick: function() {
    console.log('Changing state to play');
    this.game.state.start('play');
  }
};
module.exports = Quiz;
