'use strict';
var Point = require('../prefabs/point');

function Play() {}
Play.prototype = {
  create: function() {
    this.backgroundMap = this.game.add.sprite(0, 0, 'map');
    this.pointGroup = this.game.add.group();

    var point1 = new Point(this.game, 515, 616);
    var point2 = new Point(this.game, 553, 483);
    var point3 = new Point(this.game, 451, 407);
    var point4 = new Point(this.game, 446, 101);

    this.pointGroup.add(point1);
    this.pointGroup.add(point2);
    this.pointGroup.add(point3);
    this.pointGroup.add(point4);
  },
  update: function() {
  },
  render: function() {
    this.game.debug.inputInfo(32, 32);
    this.game.debug.pointer( this.game.input.activePointer );
  }
};

module.exports = Play;