'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function() {
  },
  create: function() {
    this.game.add.sprite(0, 0, 'game_over_background');
    window.localStorage.clear();
    this.addCongratulatoryText();
    var instructionText = this.game.add.text(this.game.world.centerX, 600, 'Klikkaa palataksesi alkuun',
      {font: '18px Arial', fill: 'white', strokeThickness: 5, align: 'center'});
    instructionText.anchor.setTo(0.5, 0.5);
    console.log(this.game.data.wrongAnswers + ' wrong answers given');
  },
  update: function() {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('menu');
    }
  },
  addCongratulatoryText: function() {
    var congratulatoryString = this.getCorrectCongratulatoryString();
    var textStyle = {
      font: '24pt Arial',
      fill: 'white',
      strokeThickness: 5,
      align: 'center',
      wordWrap: true,
      wordWrapWidth: 574
    };
    var congratolutaryText = this.game.add.text(this.game.world.centerX, 100, congratulatoryString, textStyle);
    congratolutaryText.anchor.setTo(0.5, 0.5);
  },
  getCorrectCongratulatoryString: function() {
    var congratulatoryStrings;
    if (this.game.data.selectedAvatarKey === 'avatar_1') {
      congratulatoryStrings = this.game.data.girlCongratulatoryStrings;
    } else if (this.game.data.selectedAvatarKey === 'avatar_2') {
      congratulatoryStrings = this.game.data.boyCongratulatoryStrings;
    } else {
      congratulatoryStrings = this.game.data.boyCongratulatoryStrings;
    }
    if (congratulatoryStrings === undefined) {
      congratulatoryStrings = this.game.data.boyCongratulatoryStrings;
    }
    if (congratulatoryStrings === undefined) {
      return '';
    }
    var correctText;
    switch (this.game.data.wrongAnswers) {
      case 0:
        correctText = congratulatoryStrings.excellent;
        break;
      case 1:
        correctText = congratulatoryStrings.great;
        break;
      case 2:
        correctText = congratulatoryStrings.good;
        break;
      case 3:
      case 4:
        correctText = congratulatoryStrings.rookie;
        break;
      default:
        correctText = congratulatoryStrings.poor;
    }
    return correctText;
  }
};
module.exports = GameOver;
