'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(512, 384, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    //Menu state assets
    this.load.image('menu-background', 'assets/menu/aloitus.png');
    this.load.spritesheet('start-button', 'assets/menu/aloita.png', 220, 96);
    this.load.spritesheet('fullscreenButton', 'assets/menu/ruutukoko.png', 284, 284);

    //Play state assets
    this.load.image('map', 'assets/play/karttatausta.png');
    this.load.spritesheet('point', 'assets/play/karttapiste.png', 98, 98);
    this.load.spritesheet('start-end', 'assets/play/lahto_maali.png', 190, 246);
    this.load.image('avatar', 'assets/play/avatar_nainen.png');

    //Quiz state assets
    this.load.image('quiz-background-1', 'assets/quiz/taustakuva_kauppatori.png');
    this.load.image('background-box', 'assets/quiz/valintojen_tausta.png');
    this.load.spritesheet('answer-button', 'assets/quiz/valintapainike.png', 332, 121);
    this.load.image('quiz-confirm', 'assets/quiz/vahvista.png');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if (!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
