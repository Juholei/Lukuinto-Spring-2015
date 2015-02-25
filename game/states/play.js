'use strict';
var Point = require('../prefabs/point');
var Avatar = require('../prefabs/avatar');

function Play() {}
Play.prototype = {
  create: function() {
    this.backgroundMap = this.game.add.sprite(0, 0, 'map');
    this.pointGroup = this.game.add.group();

    var startPoint = this.game.add.sprite(246, 118, 'start-end', 0);
    startPoint.anchor.setTo(0.5, 0.5);
    startPoint.scale.setTo(0.5, 0.5);

    var endPoint = this.game.add.sprite(797, 680, 'start-end', 1);
    endPoint.anchor.setTo(0.5, 0.5);
    endPoint.scale.setTo(0.5, 0.5);

    this.avatar = new Avatar(this.game, 246, 143);
    this.game.add.existing(this.avatar);

    var point1 = new Point(this.game, 446, 101);
    var point2 = new Point(this.game, 451, 407);
    var point3 = new Point(this.game, 553, 483);
    var point4 = new Point(this.game, 515, 616);

    this.pointGroup.add(startPoint);
    this.pointGroup.add(endPoint);
    this.pointGroup.add(point1);
    this.pointGroup.add(point2);
    this.pointGroup.add(point3);
    this.pointGroup.add(point4);
  },
  update: function() {
  },
  render: function() {
    // this.game.debug.inputInfo(32, 32);
    // this.game.debug.pointer( this.game.input.activePointer );
  }
};

module.exports = Play;