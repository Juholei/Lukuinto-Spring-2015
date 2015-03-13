'use strict';
var Point = require('../prefabs/point');
var Avatar = require('../prefabs/avatar');
var MajorPoint = require('../prefabs/majorpoint');

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
  //Add all the game objects to the game.
  //These include starting point, normal points, the player avatar and endpoint.
  createBoardFromGameData: function() {
    var data = this.game.data;

    var startPoint = new MajorPoint(this.game, data.startPoint.x, data.startPoint.y, 'start');
    this.pointGroup.add(startPoint);

    for (var i = 0; i < data.points.length; i++) {
      var pointData = data.points[i];
      this.pointGroup.add(new Point(this.game, pointData, this.clickListener, this));
    }

    var endPoint = new MajorPoint(this.game, data.endPoint.x, data.endPoint.y, 'end', this.endPointClickListener, this);
    this.pointGroup.add(endPoint);

    this.avatar = new Avatar(this.game, 246, 143);
  },
  //Checks which Point has the state 'current' and puts avatar on it.
  //If there is no Point with state 'current', puts avatar to starting point.
  putAvatarToCurrentPoint: function() {
    var currentPoint = this.pointGroup.iterate('state', Point.STATES.CURRENT, Phaser.Group.RETURN_CHILD);

    if (currentPoint !== null) {
      this.avatar.position.x = currentPoint.x;
      this.avatar.position.y = currentPoint.y;
      currentPoint.frame = 3;
    } else {
      var startPoint = this.pointGroup.iterate('state', 'start', Phaser.Group.RETURN_CHILD);
      this.avatar.position.x = startPoint.x;
      this.avatar.position.y = startPoint.y;
    }
  },
  //Click listener for Point objects.
  //Callback context here is Play state
  //Parameter item is the clicked item i.e. object of Point class.
  //function passed as callback to Avatar.moveTo changes the state to quiz after Avatar stops moving.
  clickListener: function(item) {
    this.avatar.moveTo(item, function switchCurrentPointForQuiz() {
      this.game.data.markPointAs(Point.STATES.CURRENT, Point.STATES.VISITED);
      item.setState(Point.STATES.CURRENT);
      item.pointData.state = Point.STATES.CURRENT;
      console.log(item.pointData.state);
      console.log('Changing state to quiz');
      this.game.state.start('quiz', false);
    });
  },
  //Click listener for the end point object. If the ending of the game is reachable, moves
  //Avatar to the endpoint and passes a callback function that ends the game.
  endPointClickListener: function(item) {
    if (this.game.data.isEndReachable()) {
      this.avatar.moveTo(item, function triggerEnding() {
        console.log('Game completed, changing state to gameover');
        this.game.state.start('gameover');
      });
    }
  }
};

module.exports = Play;
