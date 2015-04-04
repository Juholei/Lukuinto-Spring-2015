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
    // this.load.image('map', 'assets/play/karttatausta.png');
    this.load.spritesheet('point', 'assets/play/karttapiste.png', 98, 98);
    this.load.spritesheet('start-end', 'assets/play/lahto_maali.png', 190, 246);
    this.load.spritesheet('avatar_1', 'assets/play/avatar_nainen.png', 41, 71, 2, 0, 10);
    this.load.spritesheet('avatar_2', 'assets/play/avatar_poika.png', 41, 71, 2, 0, 10);
    this.load.spritesheet('avatar_3', 'assets/play/avatar_astrokoira.png', 45, 71, 2, 0, 1);
    this.load.spritesheet('avatar_4', 'assets/play/avatar_astronainen.png', 44, 71, 2, 0, 3);
    this.load.spritesheet('avatar_5', 'assets/play/avatar_astropoika.png', 44, 71, 2, 0, 3);

    //Quiz state assets
    this.load.image('question-background', 'assets/quiz/kuvaus_teksti.png');
    this.load.image('answer-background', 'assets/quiz/valintojen_tausta.png');
    this.load.spritesheet('answer-button', 'assets/quiz/valintapainike.png', 332, 121);
    this.load.image('quiz-confirm', 'assets/quiz/vahvista.png');
    this.load.spritesheet('button', 'assets/quiz/painike.png', 220, 96);
    this.load.image('announcement-negative', 'assets/quiz/huomio_tausta.png');
    this.load.image('announcement-positive', 'assets/quiz/oikea_vastaus.png');

    this.load.image('game_over_background', 'assets/menu/loppu.png');
  },
  create: function() {
    this.asset.cropEnabled = false;
    window.scrollTo(10, 10);
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
