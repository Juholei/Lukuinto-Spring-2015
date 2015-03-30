'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function() {
    this.load.json('strings', 'assets/strings.json');
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
    var congratolutaryString = this.getCorrectCongratulatoryString();
    var textStyle = {
      font: '24pt Arial',
      fill: 'white',
      strokeThickness: 5,
      align: 'center',
      wordWrap: true,
      wordWrapWidth: 574
    };
    var congratolutaryText = this.game.add.text(this.game.world.centerX, 100, congratolutaryString, textStyle);
    congratolutaryText.anchor.setTo(0.5, 0.5);
  },
  getCorrectCongratulatoryString: function() {
    var gameStrings = this.game.cache.getJSON('strings');
    var congratolutaryStrings;
    if (this.game.data.selectedAvatarKey === 'avatar_1') {
      congratolutaryStrings = gameStrings.girlCongratulatoryStrings;
    } else if (this.game.data.selectedAvatarKey === 'avatar_2') {
      congratolutaryStrings = gameStrings.boyCongratulatoryStrings;
    }

    var correctText;
    switch (this.game.data.wrongAnswers) {
      case 0:
        correctText = congratolutaryStrings.excellent;
        break;
      case 1:
        correctText = congratolutaryStrings.great;
        break;
      case 2:
        correctText = congratolutaryStrings.good;
        break;
      case 3:
      case 4:
        correctText = congratolutaryStrings.rookie;
        break;
      default:
        correctText = congratolutaryStrings.poor;
    }
    return correctText;
  }
};
module.exports = GameOver;
