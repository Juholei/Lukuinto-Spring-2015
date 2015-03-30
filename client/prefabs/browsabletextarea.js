'use strict';

var BrowsableTextArea = function(game, text) {
  Phaser.Sprite.call(this, game, game.world.centerX - 288, 360, 'question-background');
  this.inputEnabled = true;
  this.events.onInputDown.add(this.browseText, this);
  this.textString = text;
  this.splitText = [];
  this.splitTextToPages(this.textString);
  this.visibleTextIndex = 0;

  var textStyle = {font: '14px Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 574};
  this.currentVisibleText = game.add.text(3, 5, this.splitText[this.visibleTextIndex],  textStyle);
  this.addChild(this.currentVisibleText);

  var pageNumberTextStyle = {font: 'bold 14pt Arial', fill: 'red', align: 'right'};
  var pageNumberString = 'jatkuu... ' + (this.visibleTextIndex + 1) + '/' + this.splitText.length;
  this.pageNumberText = game.add.text(576, 154, pageNumberString, pageNumberTextStyle);
  this.pageNumberText.anchor.setTo(1, 1);
  if (this.splitText.length === 1) {
    this.pageNumberText.visible = false;
  }
  this.addChild(this.pageNumberText);
};

BrowsableTextArea.prototype = Object.create(Phaser.Sprite.prototype);
BrowsableTextArea.prototype.constructor = BrowsableTextArea;

BrowsableTextArea.prototype.update = function() {
};

BrowsableTextArea.prototype.browseText = function() {
  this.visibleTextIndex = (this.visibleTextIndex + 1) % this.splitText.length;
  this.currentVisibleText.text = this.splitText[this.visibleTextIndex];

  if (this.visibleTextIndex + 1 < this.splitText.length) {
    this.pageNumberText.text = 'jatkuu... ' + (this.visibleTextIndex + 1) + '/' + this.splitText.length;
  } else {
    this.pageNumberText.text = (this.visibleTextIndex + 1) + '/' + this.splitText.length;
  }
};

BrowsableTextArea.prototype.splitTextToPages = function(text) {
  if (text.length < 537) {
    this.splitText.push(text);
  } else {
    var i = 537;
    while (text[i] !== ' ') {
      i--;
    }
    var pageOfText = text.slice(0, i);
    this.splitText.push(pageOfText);
    this.splitTextToPages(text.slice(i));
  }
};

module.exports = BrowsableTextArea;
