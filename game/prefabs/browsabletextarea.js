'use strict';

var textStyle = {font: '14px Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 574};
var pageNumberTextStyle = {font: 'bold 14pt Arial', fill: 'red', align: 'right'};

var BrowsableTextArea = function(game, text) {
  Phaser.Sprite.call(this, game, game.world.centerX - 288, 360, 'question-background');
  this.inputEnabled = true;
  this.events.onInputDown.add(this.browseText, this);
  this.textString = text;
  this.splitText = [];
  this.splitTextToPages(this.textString);
  this.visibleTextIndex = 0;

  this.currentVisibleText = game.add.text(3, 5, this.splitText[this.visibleTextIndex],  textStyle);
  this.addChild(this.currentVisibleText);

  this.pageNumberText = game.add.text(576, 154, this.createPageNumberText(), pageNumberTextStyle);
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
  this.pageNumberText.text = this.createPageNumberText();
};

BrowsableTextArea.prototype.splitTextToPages = function(text) {
  var pageLength = 537;
  if (text.length < pageLength) {
    this.splitText.push(text);
  } else {
    var i = pageLength;
    while (text[i] !== ' ') {
      i--;
    }
    var pageOfText = text.slice(0, i);
    this.splitText.push(pageOfText);
    this.splitTextToPages(text.slice(i));
  }
};

BrowsableTextArea.prototype.createPageNumberText = function() {
  if (this.visibleTextIndex + 1 === this.splitText.length) {
    return (this.visibleTextIndex + 1) + '/' + this.splitText.length;
  }
  return 'jatkuu... ' + (this.visibleTextIndex + 1) + '/' + this.splitText.length;
};

module.exports = BrowsableTextArea;
