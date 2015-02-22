'use strict';
function Quiz() {}
Quiz.prototype = {
  preload: function() {
    // Override this method to add some load operations. 
    // If you need to use the loader, you may need to use them here.
  },
  create: function() {
    // This method is called after the game engine successfully switches states. 
    // Feel free to add any setup code here (do not load anything here, override preload() instead).
    this.startButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'button', this.actionOnClick, this);

  },
  update: function() {
    // state update code
  },
  paused: function() {
    // This method will be called when game paused.
  },
  render: function() {
    // Put render operations here.
  },
  shutdown: function() {
    // This method will be called when the state is shut down 
    // (i.e. you switch to another state from this one).
  },
  actionOnClick: function() {
    console.log('Changing state to play');
    this.game.state.start('play');
  }
};
module.exports = Quiz;
