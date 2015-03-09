'use strict';

var Announcement = function(game, callback, callbackContext) {
  Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, 'answer-background');
  this.anchor.setTo(0.5, 0.5);

  var button = game.add.button(0, 0, 'button', callback, callbackContext, 1, 0);
  this.addChild(button);
};

Announcement.prototype = Object.create(Phaser.Sprite.prototype);
Announcement.prototype.constructor = Announcement;

Announcement.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Announcement;
