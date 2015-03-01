'use strict';

var states = {
  UNVISITED: 'unvisited',  //Not visited yet, but not reachable yet
  VISITED: 'visited',    //Already visited. Can't go back?
  CURRENT: 'current',    //Current place
  NEXT: 'next'        //Next Point where you can go
};

var Point = function(game, pointData, callbackContext) {
  Phaser.Sprite.call(this, game, pointData.x, pointData.y, 'point');
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(0.5, 0.5);
  // this.inputEnabled = true;
  this.setState(pointData.state);
  this.events.onInputDown.add(this.clickListener, callbackContext);
};

Point.prototype = Object.create(Phaser.Sprite.prototype);
Point.prototype.constructor = Point;

Point.prototype.update = function() {
};

//Callback context here is Play state
//Parameter item is the clicked item i.e. object of this class
//function whenStopped passed as callback changes the state to quiz.
Point.prototype.clickListener = function(item) {
  this.avatar.moveTo(item, function whenStopped() {
    console.log('Changing state to quiz');
    this.game.state.start('quiz', false);
  });
};

Point.prototype.setState = function(state) {
  this.state = state;
  switch (state) {
    case states.CURRENT:
      this.frame = 2;
      break;
    case states.NEXT:
      this.frame = 1;
      this.inputEnabled = true;
      break;
    case states.UNVISITED:
      this.frame = 0;
      this.inputEnabled = false;
      console.log('unvisited set ' + this.inputEnabled);
      break;
    case states.VISITED:
      this.frame = 1;
      break;
    default:
      console.log('Unsupported state encountered: ' + state);
  }
};
module.exports = Point;
