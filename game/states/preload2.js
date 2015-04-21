'use strict';
function Preload2() {
  this.asset = null;
  this.ready = false;
}

Preload2.prototype = {
  preload: function() {
    this.load.enableParallel = false;
    this.asset = this.add.sprite(512, 384, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    var gameData = this.game.data;

    var urlPrefix = 'files/';
    if (gameData.name === 'lukuseikkailu-2015') {
      urlPrefix = '';
    }

    if (gameData.image !== undefined) {
      this.load.image('map', urlPrefix + gameData.image);
    } else {
      this.load.image('map', 'assets/play/karttatausta.png');
    }
    this.loadGameImages(gameData, urlPrefix);
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if (!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  },
  loadGameImages: function(gameData, urlPrefix) {
    for (var i = 0; i < gameData.points.length; i++) {
      var pointData = gameData.points[i];
      if (pointData.image !== null && pointData.image !== undefined) {
        console.log('Loading ' + pointData.image);
        this.load.image(pointData.image, urlPrefix + pointData.image);
      }
      for (var j = 0; j < pointData.tasks.length; j++) {
        var task = pointData.tasks[j];
        if (task.image !== null && task.image !== undefined) {
          console.log('Loading ' + task.image);
          this.load.image(task.image, urlPrefix + task.image);
        }
      }
    }
  }
};

module.exports = Preload2;
