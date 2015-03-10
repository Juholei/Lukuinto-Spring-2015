'use strict';

var Announcement = function(game, callback, callbackContext, announcementText) {
  var t0 = performance.now();

  var bitmapData = game.add.bitmapData(1, 1);
  bitmapData.fill(0, 0, 0, 0.7);
  Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, bitmapData);
  this.anchor.setTo(0.5, 0.5);
  this.height = 768;
  this.width = 1024;

  var t1 = performance.now();
  console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
  // var sprite = game.add.sprite(0, 0, 'answer-background');
  // sprite.anchor.setTo(0.5, 0.5);
  // this.addChild(sprite);
  // var button = game.add.button(0, sprite.height / 4, 'button', callback, callbackContext, 1, 0);
  // button.anchor.setTo(0.5, 0.5);

  // var textStyle = {font: '32px Arial', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: 574};
  // var text = game.add.text(-100, 0, announcementText, textStyle);
  // text.anchor.setTo(0.5, 0.5);

  // var buttonText = game.add.text(0, 0, 'OK', textStyle);
  // buttonText.anchor.setTo(0.5, 0.5);

  // button.addChild(buttonText);
  // this.addChild(button);
  // this.addChild(text);

};

Announcement.prototype = Object.create(Phaser.Sprite.prototype);
Announcement.prototype.constructor = Announcement;

Announcement.prototype.update = function() {
};

module.exports = Announcement;
