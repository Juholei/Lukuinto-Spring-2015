'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('menu-background', 'assets/menu/aloitus.png');
    this.load.spritesheet('start-button', 'assets/menu/aloita.png', 220, 96);
    this.load.spritesheet('fullscreenButton', 'assets/menu/ruutukoko.png', 284, 284);
    this.load.image('background-box', 'assets/valintojen_tausta.png');
    this.load.image('map', 'assets/karttatausta.png');
    this.load.image('quiz-background-1', 'assets/taustakuva_kauppatori.png');
    this.load.spritesheet('answer-buttons', 'assets/valinta_spritesheet.png', 332, 121);
    this.load.spritesheet('point', 'assets/karttapiste.png', 98, 98);
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
