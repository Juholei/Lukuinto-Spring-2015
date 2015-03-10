'use strict';

var Announcement = function(game, callback, callbackContext, announcementText) {
  Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY);
  this.game = game;
  this.anchor.setTo(0.5, 0.5);
  this.textStyle = {font: '32px Arial', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: 280};

  this.addOverlay();
  this.addBackgroundBox();
  this.addTitleText(announcementText);
  this.addOkButton(0, 108, callback, callbackContext);
};

Announcement.prototype = Object.create(Phaser.Sprite.prototype);
Announcement.prototype.constructor = Announcement;

Announcement.prototype.update = function() {
};

Announcement.prototype.addOverlay = function() {
  var bitmapData = this.game.add.bitmapData(1, 1);
  bitmapData.fill(0, 0, 0, 0.7);
  var overlay = this.game.add.sprite(0, 0, bitmapData);
  overlay.anchor.setTo(0.5, 0.5);
  overlay.height = 768;
  overlay.width = 1024;
  this.addChild(overlay);
};

Announcement.prototype.addBackgroundBox = function() {
  var background = this.game.add.sprite(0, 0, 'announcement');
  background.anchor.setTo(0.5, 0.5);
  this.addChild(background);
};

Announcement.prototype.addTitleText = function(announcementText) {
  var text = this.game.add.text(0, 20, announcementText, this.textStyle);
  text.anchor.setTo(0.5, 0.5);
  this.addChild(text);
};

Announcement.prototype.addOkButton = function(x, y, callback, callbackContext) {
  var button = this.game.add.button(x, y, 'button', callback, callbackContext, 1, 0);
  button.anchor.setTo(0.5, 0.5);
  this.addChild(button);

  var buttonText = this.game.add.text(0, 0, 'OK', this.textStyle);
  buttonText.anchor.setTo(0.5, 0.5);
  button.addChild(buttonText);
};

module.exports = Announcement;
