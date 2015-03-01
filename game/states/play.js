'use strict';
var Point = require('../prefabs/point');
var Avatar = require('../prefabs/avatar');

function Play() {}
Play.prototype = {
  create: function() {
    this.backgroundMap = this.game.add.sprite(0, 0, 'map');
    this.createBoardFromGameData();
    this.putAvatarToCurrentPoint();
  },
  update: function() {
  },
  render: function() {
    // this.game.debug.inputInfo(32, 32);
    // this.game.debug.pointer(this.game.input.activePointer);
  },
  createBoardFromGameData: function() {
    this.pointGroup = this.game.add.group();
    var data = this.game.data;

    var startPoint = this.game.add.sprite(data.startPoint.x, data.startPoint.y, 'start-end', 0);
    startPoint.state = 'start';
    startPoint.anchor.setTo(0.5, 0.5);
    startPoint.scale.setTo(0.5, 0.5);
    this.pointGroup.add(startPoint);

    var endPoint = this.game.add.sprite(data.endPoint.x, data.endPoint.y, 'start-end', 1);
    endPoint.anchor.setTo(0.5, 0.5);
    endPoint.scale.setTo(0.5, 0.5);
    this.pointGroup.add(endPoint);

    this.avatar = new Avatar(this.game, 246, 143);
    this.game.add.existing(this.avatar);

    for (var i = 0; i < data.points.length; i++) {
      var pointData = data.points[i];
      this.pointGroup.add(new Point(this.game, pointData, this));
    }
  },
  putAvatarToCurrentPoint: function() {
    var currentPoint = this.pointGroup.iterate('state', 'current', Phaser.Group.RETURN_CHILD);

    if (currentPoint !== null) {
      this.avatar.position.x = currentPoint.x;
      this.avatar.position.y = currentPoint.y;
    } else {
      var startPoint = this.pointGroup.iterate('state', 'start', Phaser.Group.RETURN_CHILD);
      this.avatar.position.x = startPoint.x;
      this.avatar.position.y = startPoint.y + 25;
    }
  }
};

module.exports = Play;
