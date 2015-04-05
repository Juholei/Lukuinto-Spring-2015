'use strict';

//global variables
window.onload = function() {
  var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'lukuinto-spring-2015');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  game.state.add('preload2', require('./states/preload2'));
  game.state.add('quiz', require('./states/quiz'));
  game.state.start('boot');
};
