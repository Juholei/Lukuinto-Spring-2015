'use strict';
var Point = require('../prefabs/point');

function Play() {}
Play.prototype = {
  create: function() {
    this.pointGroup = this.game.add.group();
    for(var i = 1; i < 5; i++) {
      var point = new Point(this.game, i * (this.game.width/5), this.game.height/4);
      this.pointGroup.add(point);
    }
  },
  update: function() {
  }
};

module.exports = Play;