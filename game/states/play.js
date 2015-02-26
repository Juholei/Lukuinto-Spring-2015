'use strict';
var Point = require('../prefabs/point');
var Avatar = require('../prefabs/avatar');

function Play() {}
Play.prototype = {
  create: function() {
    this.backgroundMap = this.game.add.sprite(0, 0, 'map');
    this.createBoardFromGameData();
  },
  update: function() {
  },
  render: function() {
    // this.game.debug.inputInfo(32, 32);
    // this.game.debug.pointer( this.game.input.activePointer );
  },
  createBoardFromGameData: function() {
    this.pointGroup = this.game.add.group();
    var data = this.game.data;

    var startPoint = this.game.add.sprite(data.startPoint.x, data.startPoint.y, 'start-end', 0);
    startPoint.anchor.setTo(0.5, 0.5);
    startPoint.scale.setTo(0.5, 0.5);
    this.pointGroup.add(startPoint);

    var endPoint = this.game.add.sprite(data.endPoint.x, data.endPoint.y, 'start-end', 1);
    endPoint.anchor.setTo(0.5, 0.5);
    endPoint.scale.setTo(0.5, 0.5);
    this.pointGroup.add(endPoint);

    this.avatar = new Avatar(this.game, 246, 143);
    this.game.add.existing(this.avatar);
    console.log(data);
    console.log(data.points);
    for(var i = 0; i < data.points.length; i++) {
      var point = data.points[i];
      this.pointGroup.add(new Point(this.game, point.x, point.y));
    }
  }
};

module.exports = Play;