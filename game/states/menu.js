'use strict';
var GameData = require('../prefabs/gamedata');
var LabeledButton = require('../prefabs/labeledbutton');

function Menu() {}

Menu.prototype = {
  preload: function() {
    this.load.json('gamedata', 'assets/gamedata.json', true);
  },
  create: function() {
    this.game.add.sprite(0, 0, 'menu-background');
    this.game.add.button(402, 627, 'start-button', this.startGame, this, 1, 0);
    this.textStyle = {font: '18pt Arial', fill: 'white', strokeThickness: 5, align: 'center'};

    this.createGameSelection();
    var loadedGameState = window.localStorage.getItem('lukuinto-2015');
    if (loadedGameState !== null) {
      var continueButton = new LabeledButton(this.game, 730, 675 , 'Jatka peliä', this.continueGame, this);
      this.game.add.existing(continueButton);
    }

    if (this.game.device.fullscreen) {
      this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
      var fullScreenButton = this.game.add.button(30, 30, 'fullscreenButton');
      fullScreenButton.scale.setTo(0.25, 0.25);
      fullScreenButton.events.onInputDown.add(this.toggleFullscreen, this);
    }
    this.addAvatarSelection();
  },
  update: function() {
  },
  toggleFullscreen: function(button) {
    if (this.game.scale.isFullScreen) {
      this.game.scale.stopFullScreen();
      button.frame = 0;
    } else {
      this.game.scale.startFullScreen();
      button.frame = 1;
    }
  },
  createGameSelection: function() {
    this.games = [];
    this.games.push({name: 'Lukuseikkailu', data: 'assets/gamedata.json'});
    var availableGames = this.game.cache.getJSON('games');
    for (var i = 0; i < availableGames.length; i++) {
      this.games.push({name: availableGames[i].name, data: 'game/' + availableGames[i].id});
    }
    this.selectedGame = this.games[0];
    var callback = function(button) {
      var index = (this.games.indexOf(this.selectedGame) + 1) % this.games.length;
      this.selectedGame = this.games[index];
      button.buttonText.text = this.selectedGame.name;
    };
    var selectionButton = new LabeledButton(this.game, 293, 675, this.selectedGame.name, callback, this);
    selectionButton.buttonText.scale.setTo(0.75);
    this.game.add.existing(selectionButton);
    this.game.add.text(233, 585, 'Valitse peli', this.textStyle);
  },
  startGame: function() {
    var loader = new Phaser.Loader(this.game);
    loader.onFileComplete.add(function() {
      this.game.data = new GameData(this.game.cache.getJSON('game'));
      this.setAvatarSelectionToGameData();
      this.game.state.start('preload2');
    }, this);
    loader.json('game', this.selectedGame.data);
    loader.start();
  },
  continueGame: function() {
    var loadedGameState = window.localStorage.getItem('lukuinto-2015');
    this.game.data = new GameData(JSON.parse(loadedGameState));
    this.setAvatarSelectionToGameData();
    this.game.state.start('preload2');
  },
  addAvatarSelection: function() {
    var avatarSelectionText = this.game.add.text(this.game.world.centerX, 470, 'Valitse hahmo', this.textStyle);
    avatarSelectionText.anchor.setTo(0.5, 0.5);
    this.avatarSelectionButtons = this.game.add.group();
    for (var i = 0; i < 5; i++) {
      var avatarKey = 'avatar_' + (i + 1);
      var avatarButton = this.game.add.button(384 + i * 64, 545, avatarKey, this.selectAvatar, this);
      avatarButton.anchor.setTo(0.5);
      this.avatarSelectionButtons.add(avatarButton);
    }
    this.avatarSelectionButtons.getChildAt(0).frame = 1;
  },
  selectAvatar: function(item) {
    this.selectedAvatarKey = item.key;
    this.avatarSelectionButtons.setAll('frame', 0);
    item.frame = 1;
  },
  setAvatarSelectionToGameData: function() {
    if (this.selectedAvatarKey !== undefined) {
      this.game.data.selectedAvatarKey = this.selectedAvatarKey;
    }
  }
};

module.exports = Menu;
