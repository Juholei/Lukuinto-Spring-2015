'use strict';
var Point = require('../prefabs/point');
var Avatar = require('../prefabs/avatar');

function Play() {}
Play.prototype = {
  create: function() {
    this.backgroundMap = this.game.add.sprite(0, 0, 'map');
    this.pointGroup = this.game.add.group();
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
    var data = this.game.data;

    var startPoint = this.game.add.sprite(data.startPoint.x, data.startPoint.y, 'start-end', 0);
    startPoint.state = 'start';
    startPoint.anchor.setTo(0.5, 0.5);
    startPoint.scale.setTo(0.5, 0.5);
    this.pointGroup.add(startPoint);

    for (var i = 0; i < data.points.length; i++) {
      var pointData = data.points[i];
      this.pointGroup.add(new Point(this.game, pointData, this.clickListener, this));
    }

    this.avatar = new Avatar(this.game, 246, 143);

    var endPoint = this.game.add.sprite(data.endPoint.x, data.endPoint.y, 'start-end', 1);
    endPoint.state = 'end';
    endPoint.anchor.setTo(0.5, 0.5);
    endPoint.scale.setTo(0.5, 0.5);
    this.pointGroup.add(endPoint);
  },
  putAvatarToCurrentPoint: function() {
    var currentPoint = this.pointGroup.iterate('state', Point.STATES.CURRENT, Phaser.Group.RETURN_CHILD);

    if (currentPoint !== null) {
      this.avatar.position.x = currentPoint.x;
      this.avatar.position.y = currentPoint.y;
      currentPoint.frame = 3;
    } else {
      var startPoint = this.pointGroup.iterate('state', 'start', Phaser.Group.RETURN_CHILD);
      this.avatar.position.x = startPoint.x;
      this.avatar.position.y = startPoint.y + 25;
    }
  },
  //Callback context here is Play state
  //Parameter item is the clicked item i.e. object of this class
  //function passed as callback to Avatar changes the state to quiz after Avatar stops moving.
  clickListener: function(item) {
    this.avatar.moveTo(item, function switchCurrentPointForQuiz() {
      this.game.data.markPointAs(Point.STATES.CURRENT, Point.STATES.VISITED);
      item.setState('current');
      item.pointData.state = 'current';
      console.log('Changing state to quiz');
      this.game.state.start('quiz', false);
    });
  }
};

module.exports = Play;
