'use strict';

var Announcement = function(game, callback, callbackContext, announcementText) {
  Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, 'answer-background');
  this.anchor.setTo(0.5, 0.5);

  var button = game.add.button(0, this.height / 4, 'button', callback, callbackContext, 1, 0);
  button.anchor.setTo(0.5, 0.5);

  var textStyle = {font: '32px Arial', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: 574};
  var text = game.add.text(-100, 0, announcementText, textStyle);
  text.anchor.setTo(0.5, 0.5);

  var buttonText = game.add.text(0, 0, 'OK', textStyle);
  buttonText.anchor.setTo(0.5, 0.5);

  button.addChild(buttonText);
  this.addChild(button);
  this.addChild(text);

};

Announcement.prototype = Object.create(Phaser.Sprite.prototype);
Announcement.prototype.constructor = Announcement;

Announcement.prototype.update = function() {
};

module.exports = Announcement;
